import React from "react-native"
import { View, ScrollView, Image, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import styled from "styled-components"
import ChallengingCard from "./ChallengingCard"
import {
  RankingChallengeIcon,
  NormalChallengeIcon,
} from "../../assets/images/MyCGScreen/MyCGScreen"
import { useState, useEffect } from "react"
import AppModal from "../common/AppModal"
import Feed from "./Feed"
import { AuthorizationInstance } from "../../api/settings"

const Challenging = () => {
  const navigation = useNavigation()
  const [rankingCGList, setRankingCGList] = useState([])
  const [userCGList, setUserCGList] = useState([])

  const instance = AuthorizationInstance()

  const tempRankingCGList = [
    {
      challengeId: 34,
      challengeImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
      challengeName: "찬호와 아이들",
      challengeTopic: "하루 3잔 물마시기",
      startDate: new Date(2022, 10, 5),
      endDate: new Date(2022, 10, 10),
      peopleCnt: 4,
    },
  ]

  const tempUserCGList = [
    {
      challengeId: 34,
      challengeImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
      challengeName: "찬호와 아이들",
      challengeTopic: "하루 3잔 물마시기",
      startDate: new Date(2022, 10, 5),
      endDate: new Date(2022, 10, 10),
      peopleCnt: 4,
    },
  ]
  // 여기 함수를 넣자
  function pressHandler() {
    navigation.push("CGRoom")
  }

  useEffect(() => {
    const getChallenge = async () => {
      try {
        const res = await instance.get("/api/user/ongoing")
        const NewRankingCGList = res.data.rankingChallengeList
        const NewUserCGList = res.data.userChallengeList
        setRankingCGList(NewRankingCGList)
        setUserCGList(NewUserCGList)
      } catch (err) {
        console.log(err.response.data)
      }
    }
    getChallenge()
  }, [])

  return (
    <ScrollBackground>
      <DivideView>
        <IconView>
          <RankingChallengeIcon />
        </IconView>
        <AppBoldText>랭킹 챌린지</AppBoldText>
      </DivideView>
      {tempRankingCGList.map((challengeInfo, idx) => (
        <ChallengingCard
          key={challengeInfo.challengeId}
          challengeInfo={challengeInfo}
          func={pressHandler}
        />
      ))}
      {/* 나중에 얘로 갈아끼우죠 */}
      {/* {rankingCGList.map((challengeInfo, idx) => (
        <ChallengingCard
          key={challengeInfo.challengeId}
          challengeInfo={challengeInfo}
          func={pressHandler}
        />
      ))} */}
      <DivideView>
        <IconView>
          <NormalChallengeIcon />
        </IconView>
        <AppBoldText>일반 챌린지</AppBoldText>
      </DivideView>
      {tempUserCGList.map((challengeInfo, idx) => (
        <ChallengingCard
          key={challengeInfo.challengeId}
          challengeInfo={challengeInfo}
          func={pressHandler}
        />
      ))}
      {/* 나중에 얘로 갈아끼우죠 */}
      {/* {userCGList.map((challengeInfo, idx) => (
        <ChallengingCard
          key={challengeInfo.challengeId}
          challengeInfo={challengeInfo}
          func={pressHandler}
        />
      ))} */}
    </ScrollBackground>
  )
}

const fivePercent = (Dimensions.get("window").width * 0.05) / 2

const ScrollBackground = styled.ScrollView`
  background: #edf8ff;
`

const DivideView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 10px ${fivePercent}px;
`
export default Challenging

const IconView = styled.View`
  width: 15%;
  height: 50px;
`
