import React from "react-native"
import { View, ScrollView, Image, Dimensions } from "react-native"
import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import styled from "styled-components"
import ProceedingCard from "./ProceedingCard"
import {
  RankingChallengeIcon,
  NormalChallengeIcon,
} from "../../assets/images/MyCGScreen/MyCGScreen"

const Proceeding = () => {
  const tempList = [
    {
      presetTopic: "운동 하기",
      challengePresetID: 1,
      memberNumber: 4,
      progress: 20,
      startDate: "22.10.20",
      endDate: "11.30",
      isParticipated: true,
      peopleNumber: 23,
    },
    {
      presetTopic: "기상 미션 (7시)",
      challengePresetID: 2,
      memberNumber: 4,
      progress: 20,
      startDate: "22.10.20",
      endDate: "11.30",
      isParticipated: true,
      peopleNumber: 21,
    },
    {
      presetTopic: "매일 독서하기 (7시)",
      challengePresetID: 3,
      memberNumber: 4,
      progress: 20,
      startDate: "22.10.20",
      endDate: "11.30",
      isParticipated: false,
      peopleNumber: 20,
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
        .filter((listItem) => listItem.isParticipated)
        .map((challengeInfo, idx) => (
          <ProceedingCard key={idx} challengeInfo={challengeInfo} />
        ))}
      {tempList
        .filter((listItem) => !listItem.isParticipated)
        .map((challengeInfo, idx) => (
          <ProceedingCard key={idx} challengeInfo={challengeInfo} />
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
export default Proceeding

const IconView = styled.View`
  width: 15%;
  height: 50px;
`
