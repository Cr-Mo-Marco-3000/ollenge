import React from "react-native"
import { View } from "react-native"
import styled from "styled-components"

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
  ]
  // const [feedList, set]
  // const [feedsListShowed, setFeedsListShowed] = useState([])

  return (
    <FeedBody>
      <FeedInner></FeedInner>
    </FeedBody>
  )
}

const FeedBody = styled.View`
  flex: 1;
  justify-content: flex-end;
`

const FeedInner = styled.View`
  height: 95%;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export default FeedsArea
