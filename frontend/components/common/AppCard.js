import React from "react-native"
import { View, StyleSheet } from "react-native"
import ColorSet from "../../style/ColorSet"

/*
card 컴포넌트입니다

prop 설명:
height - 높이는, 카드 자체의 높이가 아니라 카드가 들어갈 공간의 높이입니다.

넓이는 무조건 최대 넓이의 90%를 먹게 지정해 높았습니다.
*/
export default function AppCard(props) {
  return (
    // 카드가 들어갈 공간
    <View style={{ ...styles.cardShadow, height: "100%", width: "100%" }}>{props.children}</View>
  )
}

export const styles = StyleSheet.create({
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
