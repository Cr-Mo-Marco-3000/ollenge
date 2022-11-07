import React from "react-native"
import { View, ScrollView, Image, Dimensions } from "react-native"
import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import styled from "styled-components"
import ChallengingCard from "./ChallengingCard"
import {
  RankingChallengeIcon,
  NormalChallengeIcon,
} from "../../assets/images/MyCGScreen/MyCGScreen"
import { useState } from "react"
import AppModal from "../common/AppModal"
import Feed from "./Feed"
const Challenging = () => {
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
  // 여기 함수를 넣자
  const myFunc = () => {
    console.log("앙냥냥")
  }
  const [openModal, setOpenModal] = useState(false)

  const openAndClose = () => {
    setOpenModal(!openModal)
  }

  return (
    <ScrollBackground>
      {openModal && (
        <AppModal openAndClose={openAndClose} title={myFunc}>
          <Feed />
        </AppModal>
      )}
      <DivideView>
        <IconView>
          <RankingChallengeIcon />
        </IconView>
        <AppBoldText>랭킹 챌린지</AppBoldText>
      </DivideView>
      {tempList
        .filter((listItem) => listItem.isChallenge)
        .map((challengeInfo, idx) => (
          <ChallengingCard key={idx} challengeInfo={challengeInfo} func={openAndClose} />
        ))}
      <DivideView>
        <IconView>
          <NormalChallengeIcon />
        </IconView>
        <AppBoldText>일반 챌린지</AppBoldText>
      </DivideView>
      {tempList
        .filter((listItem) => !listItem.isChallenge)
        .map((challengeInfo, idx) => (
          <ChallengingCard key={idx} challengeInfo={challengeInfo} func={openAndClose} />
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
export default Challenging

const IconView = styled.View`
  width: 15%;
  height: 50px;
`
