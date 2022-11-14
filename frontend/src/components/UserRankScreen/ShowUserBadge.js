import React from "react"
import { Image, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native"
import TopMargin from "../common/TopMargin"
import UserBadgeList from "./UserBadgeList"
import { LinearGradient } from "expo-linear-gradient"
import ColorSet from "../../style/ColorSet"
import UserInfoView from "./UserInfoView"

import DeviceInfo from "../../style/DeviceInfo"
import PageBase from "./PageBase"
import AppText from "../common/AppText"

const { dw, dh } = DeviceInfo

export default function ShowUserBadge({ route }) {
  const user = route.params.user

  return (
    <PageBase>
      <View style={frameStyles.whole}>
        <View style={frameStyles.profile}>
          <Image
            source={require("../../assets/profile/me2.jpg")}
            style={{ width: dw * 0.35, height: dw * 0.35 }}
          />
        </View>
        <View alignItems="center">
          <AppText size={6}>{user.nickname}</AppText>
          <AppText size={4} color={"orange"}>
            {user.userScore}점
          </AppText>
        </View>
      </View>
      {/* 뱃지 리스트 */}
      <View style={{ width: "81%" }}>
        {["red", "blue", "yellow"].map((color) => {
          return (
            <View key={color} style={frameStyles.badgeFrame}>
              {[1, 2, 3].map((num) => {
                return (
                  <View key={num} style={frameStyles.badge}>
                    <Image
                      source={require("../../assets/profile/me2.jpg")}
                      style={{ width: dw * 0.25, height: dw * 0.25 }}
                    />
                  </View>
                )
              })}
            </View>
          )
        })}
      </View>
    </PageBase>
  )
}

const frameStyles = StyleSheet.create({
  whole: { width: "100%", marginBottom: dh * 0.02, alignItems: "center" },
  profile: { borderRadius: 90, overflow: "hidden", elevation: 20 },
  badgeFrame: { flexDirection: "row" },
  badge: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    margin: "1%",
    elevation: 100,
  },
})
