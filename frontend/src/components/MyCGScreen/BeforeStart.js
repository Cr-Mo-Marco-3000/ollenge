import React from "react-native"
import { Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import AppBoldText from "../common/AppBoldText"
import styled from "styled-components"
import BeforeStartCard from "./BeforeStartCard"
import {
  RankingChallengeIcon,
  NormalChallengeIcon,
} from "../../assets/images/MyCGScreen/MyCGScreen"
import { useState, useEffect } from "react"
import { AuthorizationInstance } from "../../api/settings"

const BeforeStart = (props) => {
  const navigation = useNavigation()
  const [rankingCGList, setRankingCGList] = useState([])
  const [userCGList, setUserCGList] = useState([])
  const instance = AuthorizationInstance()

  // const tempRankingCGList = [
  //   {
  //     challengeId: 34,
  //     challengeImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
  //     challengeName: "찬호와 아이들",
  //     challengeTopic: "하루 3잔 물마시기",
  //     startDate: new Date(2022, 10, 10),
  //     endDate: new Date(2022, 10, 15),
  //     peopleCnt: 4,
  //   },
  // ]

  // const tempUserCGList = [
  //   {
  //     challengeId: 35,
  //     challengeImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
  //     challengeName: "찬호와 아이들",
  //     challengeTopic: "하루 3잔 물마시기",
  //     startDate: new Date(2022, 10, 10),
  //     endDate: new Date(2022, 10, 15),
  //     peopleCnt: 4,
  //   },
  // ]

  useEffect(() => {
    const getChallenge = async () => {
      try {
        const res = await instance.get("/api/user/scheduled")
        const NewRankingCGList = res.data.rankingChallengeList
        const NewUserCGList = res.data.userChallengeList
        setRankingCGList(NewRankingCGList)
        setUserCGList(NewUserCGList)
      } catch (err) {
        // console.log(err)
      }
    }
    getChallenge()
  }, [])

  const pressHandler = (id) => {
    props.idHandler(id)
    navigation.push("CGRoom")
  }

  return (
    <ScrollBackground>
      <DivideView>
        <IconView>
          <RankingChallengeIcon />
        </IconView>
        <AppBoldText>랭킹 챌린지</AppBoldText>
      </DivideView>
      {rankingCGList.map((challengeInfo) => (
        <BeforeStartCard
          key={challengeInfo.challengeId}
          challengeInfo={challengeInfo}
          func={() => {
            pressHandler(challengeInfo.challengeId)
          }}
        />
      ))}
      {/* {rankingCGList.map((challengeInfo) => (
            <BeforeStartCard
              key={challengeInfo.challengeId}
              challengeInfo={challengeInfo}
              func={() => {
                pressHandler(challengeInfo.challengeId)
              }}
            />
          ))} */}
      <DivideView>
        <IconView>
          <NormalChallengeIcon />
        </IconView>
        <AppBoldText>일반 챌린지</AppBoldText>
      </DivideView>
      {userCGList.map((challengeInfo) => (
        <BeforeStartCard
          key={challengeInfo.challengeId}
          challengeInfo={challengeInfo}
          func={() => {
            pressHandler(challengeInfo.challengeId)
          }}
        />
      ))}
      {/* {userCGList.map((challengeInfo) => (
            <BeforeStartCard
              key={challengeInfo.challengeId}
              challengeInfo={challengeInfo}
              func={() => {
                pressHandler(challengeInfo.challengeId)
              }}
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
export default BeforeStart

const IconView = styled.View`
  width: 15%;
  height: 50px;
`
