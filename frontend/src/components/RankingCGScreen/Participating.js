import React from "react-native"
import { View, ScrollView, Image, Dimensions, Modal, Pressable } from "react-native"
import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import styled from "styled-components"
import ParticipatingCard from "./ParticipatingCard"
import {
  RankingChallengeIcon,
  NormalChallengeIcon,
} from "../../assets/images/MyCGScreen/MyCGScreen"

import { useState, useEffect } from "react"

import ParticipatingDetail from "./ParticipatingDetail"

import AppModal from "../common/AppModal"

const Participating = () => {
  const [openModal, setOpenModal] = useState(false)

  const openAndClose = () => {
    setOpenModal(!openModal)
  }

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
      {openModal && (
        <AppModal openAndClose={openAndClose}>
          <ParticipatingDetail />
        </AppModal>
      )}
      <View
        style={{
          height: 20,
        }}
      ></View>
      {tempList.map((challengeInfo, idx) => (
        <ParticipatingCard key={idx} challengeInfo={challengeInfo} openAndClose={openAndClose} />
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
