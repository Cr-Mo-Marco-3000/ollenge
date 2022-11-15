import React from "react-native"
import styled from "styled-components"
import FeedItem from "./FeedItem"
import { useState, useEffect, useContext, useRef } from "react"
import { AuthorizationInstance } from "../../api/settings"
import { RoomContext } from "../../../store/room-context"
import { AuthContext } from "../../../store/auth-context"
import { useIsFocused } from "@react-navigation/native"

const FeedsArea = () => {
  const isFocused = useIsFocused()
  const instance = AuthorizationInstance()

  const roomCtx = useContext(RoomContext)
  const authCtx = useContext(AuthContext)

  const challengeId = roomCtx.roomInfo.challengeId

  const flatListRef = useRef()

  const [feedsListShowed, setFeedsListShowed] = useState([])
  const [feedCount, setFeedCount] = useState(1)

  // const feedList = [
  //   {
  //     feedID: 1,
  //     feedType: "assdf",
  //     profileImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
  //     userId: 37,
  //     nickname: "아무무",
  //     feedImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
  //     feedContent: "오늘 챌린지 인증 완료!",
  //     createdDatetime: "2022-11-15",
  //     commentNum: 3,
  //   },
  //   {
  //     feedID: 2,
  //     feedType: "assdf",
  //     profileImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
  //     userId: 37,
  //     nickname: "아무무",
  //     feedImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
  //     feedContent: "오늘 챌린지 인증 완료!",
  //     createdDatetime: "2022-11-15",
  //     commentNum: 3,
  //   },
  //   {
  //     feedID: 3,
  //     feedType: "assdf",
  //     profileImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
  //     userId: 37,
  //     nickname: "아무무",
  //     feedImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
  //     feedContent: "오늘 챌린지 인증 완료!",
  //     createdDatetime: "2022-11-15",
  //     commentNum: 3,
  //   },
  // ]

  // 시작시 전체 List 불러오기

  const getRes = async () => {
    if (challengeId) {
      try {
        const res = await instance.get(`/api/feed/${challengeId}`)
        const newFeedList = res.data.feedList
        setfeedList(newFeedList)
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
  const feedItem = (feedInfo) => <FeedItem feedInfo={feedInfo} whenClosed={getRes} />

  const onEndReached = () => {
    setFeedCount(feedCount + 1)
    // flatListRef.current.scrollToIndex({ index: 0 })
  }
  return (
    <FeedBody
      data={feedsListShowed}
      renderItem={feedItem}
      keyExtractor={(feedInfo) => feedInfo.feedId}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshing={true}
      ref={flatListRef}
    ></FeedBody>
  )
}

const FeedBody = styled.FlatList`
  margin-top: 10px;
  flex: 1;
`

export default FeedsArea
