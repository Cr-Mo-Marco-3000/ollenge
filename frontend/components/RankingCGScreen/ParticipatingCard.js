import React from "react-native"
import { View, Text, Dimensions } from "react-native"
import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import AppCard from "../common/AppCard"

export default function ParticipatingCard(props) {
  const windowWidth = Dimensions.get("window").width

  // 카드 높이 * 70%(상단높이) * 상단높이 위쪽 깎기 * 보다 약간 작게
  const circleHeightWidth = 200 * 0.7 * 0.95 * 0.75

  return (
    <View
      style={{
        backgroundColor: "#edf8ff",
        height: parseInt(200),
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 200 * 0.9,
          width: "90%",
        }}
      >
        <AppCard>
          <View></View>
        </AppCard>
      </View>
    </View>
  )
}
