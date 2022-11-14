import React from "react-native"
import { View, Text, StyleSheet, Modal, Dimensions, ScrollView } from "react-native"
import TopMargin from "../common/TopMargin"
import { Pressable } from "react-native"
import AppCard from "../common/AppCard"
import styled from "styled-components"
import { TriangleIcon } from "../../assets/images"
import { TriangleIcon2 } from "../../assets/images"
import ParticipatingDetailCard from "./ParticipatingDetailCard"
import { useEffect, useRef, useState } from "react"
import { AuthorizationInstance } from "../../api/settings"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

export default function ParticipatingDetail(props) {
  const scrollViewRef = useRef()
  const instance = AuthorizationInstance()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [participatingList, setParticipatingList] = useState([])

  // 리스트 렌더링
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

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ x: screenWidth * nowPage, animated: false })
  }, [])

  const nowPage = props.nowPage

  const arrayLength = participatingList.length

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView horizontal pagingEnabled ref={scrollViewRef}>
        {participatingList.map((challengeInfo, idx) => {
          return (
            <ParticipatingDetailCard
              key={idx}
              index={idx}
              arrayLength={arrayLength}
              challengeInfo={challengeInfo}
              startDate={props.startDate}
              endDate={props.endDate}
              makeChallenge={props.makeChallenge}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}
