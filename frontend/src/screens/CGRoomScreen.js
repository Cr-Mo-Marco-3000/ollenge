import React, { useEffect, useState } from "react"

import { View, StyleSheet, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import { Provider } from "react-native-paper"

import ColorSet from "../style/ColorSet"
import { LocalTime, DateTime } from "../functions/index"

import TopMargin from "./../components/common/TopMargin"
import UserListTap from "../components/CGRoomScreen/UserListTap"
import CGRoomInfoTag from "../components/CGRoomScreen/CGRoomInfoTag"
import InviteCodeBtn from "../components/CGRoomScreen/InviteCodeBtn"
import CGAuthBtn from "../components/CGRoomScreen/CGAuthBtn"
import ImageResistBtn from "../components/CGRoomScreen/ImageResistBtn"
import CGLeaveBtn from "../components/CGRoomScreen/CGLeaveBtn"

function CGRoomScreen({ roomInfo, userList }) {
  const navigation = useNavigation()
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    const now = LocalTime()
    const start = DateTime(roomInfo.startDate, roomInfo.startTime)
    if (now - start >= 0) {
      setIsStarted(true)
    }
  }, [roomInfo])

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
