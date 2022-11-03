import React from "react"
import { ScrollView } from "react-native"
import TopMargin from "../common/TopMargin"
import TopUserArea from "./TopUserArea"
import UserRankCard from "./UserRankCard"
import { LinearGradient } from "expo-linear-gradient"
import ColorSet from "../../style/ColorSet"

import DeviceInfo from "../../style/DeviceInfo"
const { dw, dh } = DeviceInfo

export default function RankList() {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[`${ColorSet.paleBlueColor(1)}`, `${ColorSet.yellowColor(1)}`]}
      end={{ x: 0.5, y: 1 }}
    >
      <TopMargin />

      <ScrollView style={{ width: "96%", marginRight: "2%", marginLeft: "2%" }}>
        <TopUserArea />
        <UserRankCard />
      </ScrollView>
    </LinearGradient>
  )
}
