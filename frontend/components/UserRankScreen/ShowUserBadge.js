import React from "react"
import { ScrollView, View } from "react-native"
import TopMargin from "../common/TopMargin"
import UserBadgeList from "./UserBadgeList"
import { LinearGradient } from "expo-linear-gradient"
import ColorSet from "../../style/ColorSet"
import UserInfoView from "./UserInfoView"

import DeviceInfo from "../../style/DeviceInfo"
const { dw, dh } = DeviceInfo

export default function ShowUserBadge() {
  return (
    <ScrollView>
      <LinearGradient
        style={{ flex: 1 }}
        colors={[`${ColorSet.paleBlueColor(1)}`, `${ColorSet.yellowColor(1)}`]}
        end={{ x: 0.5, y: 1 }}
      >
        <View justifyContent="center" alignItems="center" style={{ height: dh }}>
          <UserInfoView />
          <UserBadgeList />
        </View>
      </LinearGradient>
    </ScrollView>
  )
}
