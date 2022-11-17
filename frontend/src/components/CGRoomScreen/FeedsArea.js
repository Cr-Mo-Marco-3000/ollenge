import React from "react-native"
import styled from "styled-components"
import FeedItem from "./FeedItem"
import { useState, useEffect, useContext, useRef } from "react"
import { AuthorizationInstance } from "../../api/settings"
import { RoomContext } from "../../../store/room-context"
import { AuthContext } from "../../../store/auth-context"
import { useIsFocused } from "@react-navigation/native"

const FeedsArea = (props) => {
  const isFocused = useIsFocused()

  const instance = AuthorizationInstance()
  const roomCtx = useContext(RoomContext)
  const authCtx = useContext(AuthContext)

  const challengeId = roomCtx.roomInfo.challengeId

  const flatListRef = useRef()

  // 내 Id와 같으면 신고하기 벝느 머시멍ㄱ
  const myId = authCtx.userInfo.userId

  const [feedsListShowed, setFeedsListShowed] = useState([])
  const [feedCount, setFeedCount] = useState(1)

  // 시작시 전체 List 불러오기
  const getRes = async () => {
    if (challengeId) {
      try {
        const res = await instance.get(`/api/feed/${challengeId}`)
        const newFeedList = res.data.feedList
        setfeedList(newFeedList)
        setFeedsListShowed(newFeedList.slice(0, 5))
      } catch (error) {
        console.log(error.response.data)
      }
    }
  }

  const [feedList, setfeedList] = useState([])

  useEffect(() => {
    getRes()
  }, [isFocused, challengeId])

  // 보이는 피드 변경
  useEffect(() => {
    const newFeedsListShowed = feedList.slice(0, feedCount * 5)
    setFeedsListShowed(newFeedsListShowed)
  }, [feedCount])

  // 피드 아이템 개체
  const feedItem = (feedInfo) => <FeedItem feedInfo={feedInfo} whenClosed={getRes} myId={myId} />
  // 단순히 댓글을 닫았을 때 피드가 불러오지는 않게 했다.
  // const feedItem = (feedInfo) => <FeedItem feedInfo={feedInfo} />

  const onEndReached = () => {
    setFeedCount(feedCount + 1)
  }

  return (
    <FeedBody
      data={feedsListShowed}
      renderItem={feedItem}
      keyExtractor={(feedInfo) => feedInfo.feedId}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ref={flatListRef}
      extraData={[challengeId, isFocused, feedCount]}
    ></FeedBody>
  )
}

const FeedBody = styled.FlatList`
  margin-top: 10px;
  flex: 1;
`

export default FeedsArea
