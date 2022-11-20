import React, { useContext, useEffect, useState } from "react"

import { View, StyleSheet, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import LottieView from "lottie-react-native"
import { useRef } from "react"

import ColorSet from "../../style/ColorSet"
import AppBoldText from "./../common/AppBoldText"
import AppText from "../common/AppText"
import { RoomContext } from "./../../../store/room-context"
import { AuthContext } from "./../../../store/auth-context"

import { RFPercentage } from "react-native-responsive-fontsize"
import { CalendarIcon, RunGirlIcon } from "./../../assets/images/RankingCGScreen/RankingCGScreen"
import { HappyIcon } from "../../assets/images"

function EndingReport() {
  const animation = useRef(null)
  const roomCtx = useContext(RoomContext)
  const authCtx = useContext(AuthContext)
  const userId = authCtx.userInfo.userId

  const [myInfo, setMyInfo] = useState()
  const [myRank, setMyRank] = useState(0)
  const [wholeDay, setWholeDay] = useState(0)
  const [percent, setPercent] = useState(0)

  const userList = roomCtx.userList
  const roomInfo = roomCtx.roomInfo

  useEffect(() => {
    if (Object.keys(roomCtx) !== 0 && !myInfo) {
      for (let i = 0; i < userList.length; i++) {
        const user = userList[i]
        if (user.userId == userId) {
          setMyInfo(user)
          setMyRank(i + 1)
        }
      }
    }

    if (Object.keys(roomCtx) !== 0 && !wholeDay) {
      const start = new Date(roomInfo.startDate)
      const end = new Date(roomInfo.endDate)
      const temp = Math.round((end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24 + 1)
      setWholeDay(temp)
    }
  }, [roomCtx])

  useEffect(() => {
    if (myInfo && wholeDay) {
      const temp = Math.round((myInfo.datetimeList.length / wholeDay) * 100)
      setPercent(temp)
    }
  }, [myInfo, wholeDay])

  return (
    <LinearGradient
      style={styles.endingContainer}
      colors={[`${ColorSet.paleBlueColor(1)}`, `${ColorSet.yellowColor(1)}`]}
    >
      <LottieView
        autoPlay
        ref={animation}
        loop={false}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
        }}
        resizeMode="cover"
        source={
          percent >= 80
            ? require("../../assets/Lottie/Confeti.json")
            : require("../../assets/Lottie/Sparkle.json")
        }
      />

      {myInfo && (
        <View>
          <View style={{ flexDirection: "row", marginTop: "3%" }}>
            <View style={{ width: RFPercentage(4), height: RFPercentage(4), marginRight: "3%" }}>
              <HappyIcon />
            </View>
            <AppText size={2.5}>나의 달성률: {percent}%</AppText>
          </View>
          <View style={{ flexDirection: "row", marginTop: "3%" }}>
            <View style={{ width: RFPercentage(4), height: RFPercentage(4), marginRight: "3%" }}>
              <CalendarIcon />
            </View>

            <AppText size={2.5}>
              총 {wholeDay}일 중 {myInfo.datetimeList.length}일 참여했어요
            </AppText>
          </View>
          <View style={{ flexDirection: "row", marginTop: "3%" }}>
            <View style={{ width: RFPercentage(4), height: RFPercentage(4), marginRight: "3%" }}>
              <RunGirlIcon />
            </View>
            <AppText size={2.5}>
              총 {userList.length}명 중 {myRank}등이에요
            </AppText>
          </View>
        </View>
      )}
    </LinearGradient>
  )
}
export default EndingReport

const styles = StyleSheet.create({
  endingContainer: {
    alignItems: "flex-start",
    width: "100%",
    borderRadius: 10,
    paddingVertical: "2%",
    paddingHorizontal: "5%",
    marginTop: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
  },
})
