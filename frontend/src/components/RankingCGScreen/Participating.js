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
import { AuthorizationInstance } from "../../api/settings"
import AppModal from "../common/AppModal"

const Participating = () => {
  const [openModal, setOpenModal] = useState(false)
  const [nowPage, setNowPage] = useState(0)
  const instance = AuthorizationInstance()

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [participatingList, setParticipatingList] = useState(null)

  useEffect(() => {
    const call = async () => {
      try {
        const res = await instance.get("/api/challenge/scheduled")
        setStartDate(res.data.startDate)
        setEndDate(res.data.endDate)
        setParticipatingList(res.data.challengePresetList)
      } catch (err) {
        console.log(err)
      }
    }
    call()
  }, [])

  const openAndClose = (idx) => {
    setNowPage(idx)
    setOpenModal(!openModal)
  }

  return (
    <ScrollBackground>
      {/* 모달 */}
      {openModal && (
        <AppModal openAndClose={openAndClose}>
          <ParticipatingDetail
            nowPage={nowPage}
            participatingList={participatingList}
            startDate={startDate}
            endDate={endDate}
          />
        </AppModal>
      )}
      <View
        style={{
          height: 20,
        }}
      ></View>
      {participatingList?.map((challengeInfo, idx) => (
        <ParticipatingCard
          key={idx}
          challengeInfo={challengeInfo}
          openAndClose={() => {
            openAndClose(idx)
          }}
          startDate={startDate}
          endDate={endDate}
        />
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
