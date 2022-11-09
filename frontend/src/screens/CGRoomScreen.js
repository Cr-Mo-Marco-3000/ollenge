import React from "react"

import { View, StyleSheet, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import { Provider } from "react-native-paper"

import ColorSet from "../style/ColorSet"

import TopMargin from "./../components/common/TopMargin"
import UserListTap from "../components/CGRoomScreen/UserListTap"
import CGRoomInfoTag from "../components/CGRoomScreen/CGRoomInfoTag"
import InviteCodeBtn from "../components/CGRoomScreen/InviteCodeBtn"
import CGAuthBtn from "../components/CGRoomScreen/CGAuthBtn"
import ImageResistBtn from "../components/CGRoomScreen/ImageResistBtn"

function CGRoomScreen({ roomInfo }) {
  const navigation = useNavigation()

  return (
    <Provider>
      <LinearGradient
        style={{ flex: 1 }}
        colors={[`${ColorSet.whiteColor(1)}`, `${ColorSet.paleBlueColor(1)}`]}
      >
        <TopMargin />
        <TopMargin />
        <UserListTap navigation={navigation} />
        <CGRoomInfoTag roomInfo={roomInfo} />

        <View style={styles.buttonContainer}>
          <InviteCodeBtn inviteCode={roomInfo.inviteCode} />
          <CGAuthBtn navigation={navigation} />
          <ImageResistBtn navigation={navigation} />
        </View>
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
