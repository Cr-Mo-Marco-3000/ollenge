import React from "react-native"
import { View, Text, Dimensions, StyleSheet } from "react-native"
import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"

/*
card 컴포넌트입니다

prop 설명:
height - 높이는, 카드 자체의 높이가 아니라 카드가 들어갈 공간의 높이입니다.

넓이는 무조건 최대 넓이의 90%를 먹게 지정해 높았습니다.
*/
export default function AppCard(props) {
  const height = props.height
  const width = Dimensions.get("window").width * 0.9

  return (
    // 카드가 들어갈 공간
    <View
      style={{
        backgroundColor: "#edf8ff",
        height: parseInt(height),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 카드 자체 */}
      <View style={{ ...styles.cardShadow, width: width, flex: 0.9 }}>{props.children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardShadow: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: ColorSet.navyColor(1),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
})
