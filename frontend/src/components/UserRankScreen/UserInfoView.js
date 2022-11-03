import React from "react"
import { Image, View } from "react-native"
import ColorSet from "../../style/ColorSet"
import DeviceInfo from "../../style/DeviceInfo"
import AppText from "../common/AppText"

const { dw, dh } = DeviceInfo

export default function UserInfoView() {
  return (
    <View style={{ width: dw, marginBottom: dh * 0.05, alignItems: "center" }}>
      <View style={{ width: "40%", height: dw * 0.4, borderRadius: 120, overflow: "hidden" }}>
        <Image
          source={require("../../assets/profile/me2.jpg")}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View alignItems="center">
        <AppText size={8}>Chan</AppText>
        <AppText size={4} color={"orange"}>
          123점
        </AppText>
      </View>
    </View>
  )
}
