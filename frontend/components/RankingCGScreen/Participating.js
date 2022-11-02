import React from "react-native"
import { View, ScrollView, Image, Dimensions } from "react-native"
import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import styled from "styled-components"
import ParticipatingCard from "./ParticipatingCard"
import {
  RankingChallengeIcon,
  NormalChallengeIcon,
} from "../../assets/images/MyCGScreen/MyCGScreen"

const Participating = () => {
  const tempList = [
    {
      isChallenge: true,
      title: "하루 3잔 물마시기",
      teamName: "찬호와 아이들",
      memberNumber: 4,
      progress: 20,
      startDate: "10.26",
      endDate: "11.05",
    },
    {
      isChallenge: true,
      title: "하루 3잔 물마시기",
      teamName: "찬호와 아이들",
      memberNumber: 4,
      progress: 50,
      startDate: "10.26",
      endDate: "11.05",
    },
    {
      isChallenge: false,
      title: "하루 3잔 물마시기",
      teamName: "찬호와 아이들",
      memberNumber: 4,
      progress: 50,
      startDate: "10.26",
      endDate: "11.05",
    },
  ]

  return (
    <ScrollBackground>
      <View
        style={{
          height: 20,
        }}
      ></View>
      {tempList
        .filter((listItem) => listItem.isChallenge)
        .map((challengeInfo, idx) => (
          <ParticipatingCard key={idx} />
        ))}
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
export default Participating

const IconView = styled.View`
  width: 15%;
  height: 50px;
`
