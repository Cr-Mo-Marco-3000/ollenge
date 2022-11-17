import React, { useContext, useEffect, useState } from "react"

import { View, StyleSheet, Alert, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import { Provider } from "react-native-paper"
import { useHeaderHeight } from "@react-navigation/elements"

import ColorSet from "../style/ColorSet"
import { CGStartFlag, CGAuthTimeFlag } from "../functions/index"
import { RoomContext } from "../../store/room-context"

import UserListTap from "../components/CGRoomScreen/UserListTap"
import CGRoomInfoTag from "../components/CGRoomScreen/CGRoomInfoTag"
import InviteCodeBtn from "../components/CGRoomScreen/InviteCodeBtn"
import CGAuthBtn from "../components/CGRoomScreen/CGAuthBtn"
import ImageResistBtn from "../components/CGRoomScreen/ImageResistBtn"
import CGStartCount from "../components/CGRoomScreen/CGStartCount"
import TodayAuthCount from "../components/CGRoomScreen/TodayAuthCount"
import CGLeaveBtn from "../components/CGRoomScreen/CGLeaveBtn"
import FeedsArea from "../components/CGRoomScreen/FeedsArea"
import EndingReport from "../components/CGRoomScreen/EndingReport"

function CGRoomScreen() {
  const roomCtx = useContext(RoomContext)

  const roomInfo = roomCtx.roomInfo
  const userList = roomCtx.userList

  const navigation = useNavigation()
  const headerHight = useHeaderHeight()
  const [isStarted, setIsStarted] = useState("")
  const [isAuthed, setIsAuth] = useState(false)
  const [isResist, setIsResist] = useState(false)
  const [isTime, setIsTime] = useState("")

  useEffect(() => {
    setIsStarted(CGStartFlag(roomInfo.startDate, roomInfo.endDate))
    setIsTime(CGAuthTimeFlag(roomInfo.startTime, roomInfo.endTime))
  }, [roomInfo])

  useEffect(() => {
    setIsAuth(roomCtx.isAuthed)
    setIsResist(roomCtx.isResist)
  }, [roomCtx])

  return (
    <Provider>
      <LinearGradient
        style={{ flex: 1 }}
        colors={[`${ColorSet.whiteColor(1)}`, `${ColorSet.paleBlueColor(1)}`]}
      >
        <View style={{ height: headerHight }} />
        <UserListTap navigation={navigation} />
        <CGRoomInfoTag roomInfo={roomInfo} userList={userList} />
        <View style={styles.buttonContainer}>
          {isStarted == "waiting" && (
            <>
              <CGStartCount />
              <InviteCodeBtn inviteCode={roomInfo.inviteCode} challengeId={roomInfo.challengeId} />
            </>
          )}
          {isStarted == "playing" && !isAuthed && <TodayAuthCount isTime={isTime} />}
          {isStarted == "end" && <EndingReport />}
          {isResist && isStarted == "playing" && isTime == "playing" && !isAuthed && (
            <CGAuthBtn navigation={navigation} />
          )}
          {!isResist && <ImageResistBtn navigation={navigation} roomInfo={roomInfo} />}
        </View>
        {isStarted == "waiting" && (
          <CGLeaveBtn challengeId={roomInfo.challengeId} userNum={userList.length} />
        )}

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
