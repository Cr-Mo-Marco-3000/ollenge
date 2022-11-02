import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import ColorSet from "../style/ColorSet"
import TopUserArea from "../components/UserRankScreen/TopUserArea"
import { Dimensions, Text } from "react-native"
import Styled from "styled-components/native"
import { StatusBar } from "expo-status-bar"

const TitleText = Styled.Text`
  font-size: 24px;
  color: ${ColorSet.navyColor(1)};
  margin: 12px 16px;
`

function UserRankScreen() {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[`${ColorSet.paleBlueColor(1)}`, `${ColorSet.yellowColor(1)}`]}
      end={{ x: 0.5, y: 1 }}
    >
      <TitleText>유저 랭킹</TitleText>
      <TopUserArea />
      <Text>asdasdsad</Text>
    </LinearGradient>
  )
}
export default UserRankScreen
