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
import { AuthorizationInstance } from "../../api/settings"
import { useState, useEffect } from "react"

const Proceeding = () => {
  const instance = AuthorizationInstance()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [proceedingList, setProceedingList] = useState(null)

  useEffect(() => {
    const call = async () => {
      try {
        const res = await instance.get("/api/challenge/ongoing")
        setStartDate(res.data.startDate)
        setEndDate(res.data.endDate)
        setProceedingList(res.data.challengePresetList)
      } catch (err) {
        console.log(err)
      }
    }
    call()
  }, [])

  return (
    <ScrollBackground>
      <View
        style={{
          height: 20,
        }}
      ></View>
      {proceedingList?.map((challengeInfo, idx) => (
        <ProceedingCard
          key={idx}
          challengeInfo={challengeInfo}
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
export default Proceeding

const IconView = styled.View`
  width: 15%;
  height: 50px;
`
