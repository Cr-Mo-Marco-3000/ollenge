import React from "react-native"
import styled from "styled-components"
import FeedItem from "./FeedItem"

const FeedsArea = () => {
  const feedsList = [
    {
      feedID: 1,
      feedType: "assdf",
      profileImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
      userId: 37,
      nickname: "아무무",
      feedImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
      feedContent: "오늘 챌린지 인증 완료!",
      createdDatetime: "2022-11-15",
      commentNum: 3,
    },
    {
      feedID: 2,
      feedType: "assdf",
      profileImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
      userId: 37,
      nickname: "아무무",
      feedImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
      feedContent: "오늘 챌린지 인증 완료!",
      createdDatetime: "2022-11-15",
      commentNum: 3,
    },
    {
      feedID: 3,
      feedType: "assdf",
      profileImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
      userId: 37,
      nickname: "아무무",
      feedImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
      feedContent: "오늘 챌린지 인증 완료!",
      createdDatetime: "2022-11-15",
      commentNum: 3,
    },
  ]
  // const [feedList, set]
  // const [feedsListShowed, setFeedsListShowed] = useState([])

  const feedItem = (feedInfo) => <FeedItem feedInfo={feedInfo} />

  return (
    <FeedBody
      data={feedsList}
      renderItem={feedItem}
      keyExtractor={(feedInfo) => feedInfo.feedID}
    ></FeedBody>
  )
}

const FeedBody = styled.FlatList`
  margin-top: 10px;
  flex: 1;
`

export default FeedsArea
