import React, { useContext, useEffect, useState } from "react"

import { View, StyleSheet, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import { Provider } from "react-native-paper"

import ColorSet from "../style/ColorSet"
import { LocalTime, DateTime, TodayCheck } from "../functions/index"
import { RoomContext } from "../../store/room-context"
import { AuthContext } from "../../store/auth-context"

import TopMargin from "./../components/common/TopMargin"
import UserListTap from "../components/CGRoomScreen/UserListTap"
import CGRoomInfoTag from "../components/CGRoomScreen/CGRoomInfoTag"
import InviteCodeBtn from "../components/CGRoomScreen/InviteCodeBtn"
import CGAuthBtn from "../components/CGRoomScreen/CGAuthBtn"
import ImageResistBtn from "../components/CGRoomScreen/ImageResistBtn"
import CGLeaveBtn from "../components/CGRoomScreen/CGLeaveBtn"
import FeedsArea from "../components/CGRoomScreen/FeedsArea"

function CGRoomScreen() {
  const roomCtx = useContext(RoomContext)
  const authCtx = useContext(AuthContext)

  const roomInfo = roomCtx.roomInfo
  const userList = roomCtx.userList
  const MyUserId = authCtx.userInfo.MyUserId

  const navigation = useNavigation()
  const [isStarted, setIsStarted] = useState(true)
  const [todayAuth, setTodayAuth] = useState(false)

  useEffect(() => {
    const now = LocalTime()
    const start = DateTime(roomInfo.startDate, roomInfo.startTime)
    if (now - start >= 0) {
      setIsStarted(true)
    }

    userList.map((user) => {
      if (user === MyUserId) {
        const flag = TodayCheck(user.datetimeList)
        if (flag) {
          setTodayAuth(true)
        }
      }
      return
    })
  }, [roomInfo, userList])

  return (
    <Provider>
      <LinearGradient
        style={{ flex: 1 }}
        colors={[`${ColorSet.whiteColor(1)}`, `${ColorSet.paleBlueColor(1)}`]}
      >
        <TopMargin />
        <TopMargin />
        <UserListTap navigation={navigation} />
        <CGRoomInfoTag roomInfo={roomInfo} userList={userList} />

        <View style={styles.buttonContainer}>
          <InviteCodeBtn inviteCode={roomInfo.inviteCode} challengeId={roomInfo.challengeId} />
          <CGAuthBtn navigation={navigation} />
          <ImageResistBtn navigation={navigation} roomInfo={roomInfo} />
        </View>
        <CGLeaveBtn challengeId={roomInfo.challengeId} userNum={userList.length} />
        <FeedsArea></FeedsArea>
      </LinearGradient>
    </Provider>
  )
}
export default CGRoomScreen

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: "5%",
  },
  buttonBox: {
    width: "100%",
    height: "15%",
    marginTop: "5%",
  },
})
