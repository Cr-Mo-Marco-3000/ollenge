import React from "react"

import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView } from "react-native"

import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import {
  GreenSquareIcon,
  OrangeSquareIcon,
  CalendarIcon,
  StopwatchIcon,
  HandIcon,
  MedalIcon,
  BombIcon,
  RunGirlIcon,
} from "../../assets/images/RankingCGScreen/RankingCGScreen"
import AppButton from "../common/AppButton"

import { RFPercentage } from "react-native-responsive-fontsize"

function RoomInfoModalContent({ roomInfo, hideModal, userList }) {
  const [wholeDay, setWholeDay] = useState(0)
  const [time, setTime] = useState(["오전 00시", "오후 12시"])
  const [authType, setAuthType] = useState("")

  function timeFunc(str) {
    const hour = parseInt(str.substr(0, 2))
    const min = parseInt(str.substr(3, 5))
    if (min) {
      return `${hour}시 ${min}분`
    } else {
      return `${hour}시`
    }
  }

  useEffect(() => {
    if (roomInfo) {
      const startDate = new Date(roomInfo.startDate)
      const endDate = new Date(roomInfo.endDate)
      const temp = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24 + 1
      setWholeDay(temp)
      const startTime = timeFunc(roomInfo.startTime)
      const endTime = timeFunc(roomInfo.endTime)
      setTime([startTime, endTime])
      if (roomInfo.authType === "classifi") {
        setAuthType("이미지 특성 분석")
      } else if (roomInfo.authType === "feature") {
        setAuthType("이미지 비교")
      } else {
        setAuthType("자유 인증")
      }
    }
  }, [roomInfo])

  return (
    <View style={styles.modalScreen}>
      <AppBoldText color={"orange"}>{roomInfo.challengeTopic}</AppBoldText>
      <View style={{ marginTop: "3%", marginBottom: "5%", alignSelf: "flex-start" }}>
        <AppText pxSize={18}>{roomInfo.challengeDescription}</AppText>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} style={styles.scrollScreen}>
        <View style={styles.infoContainer}>
          {/* 시작일 */}
          <View style={styles.infoItem}>
            <View style={styles.imgBox}>
              <GreenSquareIcon />
            </View>
            <View style={styles.infoTextBox}>
              <AppText pxSize={16}>시작일</AppText>
              <AppText pxSize={18}>{roomInfo.startDate}</AppText>
            </View>
          </View>
          {/* 종료일 */}
          <View style={styles.infoItem}>
            <View style={styles.imgBox}>
              <OrangeSquareIcon />
            </View>
            <View style={styles.infoTextBox}>
              <AppText pxSize={16}>종료일</AppText>
              <AppText pxSize={18}>{roomInfo.endDate}</AppText>
            </View>
          </View>
          {/* 기간 */}
          <View style={styles.infoItem}>
            <View style={styles.imgBox}>
              <CalendarIcon />
            </View>
            <View style={styles.infoTextBox}>
              <AppText pxSize={16}>기간</AppText>
              <AppText pxSize={18}>{wholeDay}일</AppText>
            </View>
          </View>
          {/* 인증시간 */}
          <View style={styles.infoItem}>
            <View style={styles.imgBox}>
              <StopwatchIcon />
            </View>
            <View style={styles.infoTextBox}>
              <AppText pxSize={16}>인증 시간</AppText>
              <AppText pxSize={18}>
                {time[0]} - {time[1]}
              </AppText>
            </View>
          </View>
          {/* 인증 방식 */}
          <View style={styles.infoItem}>
            <View style={styles.imgBox}>
              <HandIcon />
            </View>
            <View style={styles.infoTextBox}>
              <AppText pxSize={16}>인증 방식</AppText>
              <AppText pxSize={18}>{authType}</AppText>
            </View>
          </View>
          {/* 1등보상 */}
          {roomInfo.rewardContent ? (
            <View style={styles.infoItem}>
              <View style={styles.imgBox}>
                <MedalIcon />
              </View>
              <View style={styles.infoTextBox}>
                <AppText pxSize={16}>1등 보상</AppText>
                <AppText pxSize={18}>{roomInfo.rewardContent}</AppText>
              </View>
            </View>
          ) : (
            <></>
          )}
          {/* 꼴등 벌칙 */}
          {roomInfo.penaltyContent ? (
            <View style={styles.infoItem}>
              <View style={styles.imgBox}>
                <BombIcon />
              </View>
              <View style={styles.infoTextBox}>
                <AppText pxSize={16}>꼴등 벌칙</AppText>
                <AppText pxSize={18}>{roomInfo.penaltyContent}</AppText>
              </View>
            </View>
          ) : (
            <></>
          )}
          {/* 참여인원 */}
          <View style={styles.infoItem}>
            <View style={styles.imgBox}>
              <RunGirlIcon />
            </View>
            <View style={styles.infoTextBox}>
              <AppText pxSize={16}>참여 인원</AppText>
              <AppText pxSize={18}>{userList.length}명</AppText>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.exitBtnBox}>
        <AppButton handler={hideModal} title={"닫기"}></AppButton>
      </View>
    </View>
  )
}
export default RoomInfoModalContent

const styles = StyleSheet.create({
  modalScreen: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  scrollScreen: {},
  infoContainer: {
    alignItems: "flex-start",
    marginBottom: "5%",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "3%",
  },
  imgBox: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    marginRight: RFPercentage(1),
  },
  infoTextBox: {
    alignItems: "flex-start",
  },
  exitBtnBox: {
    width: "30%",
    height: RFPercentage(6),
    alignSelf: "center",
  },
})
