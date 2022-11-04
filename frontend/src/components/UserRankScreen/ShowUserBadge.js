import React from "react"
import { ScrollView, Text, View } from "react-native"
import TopMargin from "../common/TopMargin"
import UserBadgeList from "./UserBadgeList"
import { LinearGradient } from "expo-linear-gradient"
import ColorSet from "../../style/ColorSet"
import UserInfoView from "./UserInfoView"

import DeviceInfo from "../../style/DeviceInfo"
import { isStyledComponent } from "styled-components/native"
const { dw, dh } = DeviceInfo

const Case = isStyledComponent

export default function ShowUserBadge({ route }) {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[`${ColorSet.paleBlueColor(1)}`, `${ColorSet.yellowColor(1)}`]}
      end={{ x: 0.5, y: 1 }}
    >
      <View justifyContent="center" alignItems="center" style={{ height: dh }}>
        <Text>{route.params.num}</Text>
        <UserInfoView />
        <UserBadgeList />
      </View>
    </LinearGradient>
  )
}
