/** react-native 시스템 Import */
import React from "react"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

/** Component Import */
import ColorSet from "../../style/ColorSet"

/** 페이지에서 사용할 스타일들 정리 */
import { StyleSheet } from "react-native"
import DeviceInfo from "../../style/DeviceInfo"
import TopMargin from "../common/TopMargin"

const { dw } = DeviceInfo

/** 모든 페이지의 기본 배경 설정 */
export default function PageBase(props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}
        colors={[`${ColorSet.paleBlueColor(1)}`, `${ColorSet.yellowColor(1)}`]}
        end={{ x: 0, y: 1 }}
        locations={[0.8, 1]}
      >
        <TopMargin />
        {props.children}
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

// export const fontStyles = StyleSheet.create({
//   HyeminBold: (props) => {
//     return {
//       fontFamily: "HyeminBold",
//       fontSize: props.size !== undefined ? (props.size * dw) / 100 : 24,
//       fontWeight: props.bold !== undefined ? props.bold : "100",
//       color: props.color !== undefined ? props.color : ColorSet.navyColor(1),
//       textAlign: props.align ? props.align : "center",
//     }
//   },

//   Hyemin: (props) => {
//     return {
//       fontFamily: "HyeminRegular",
//       fontSize: props.size !== undefined ? (props.size * dw) / 100 : 24,
//       fontWeight: props.bold !== undefined ? props.bold : "100",
//       color: props.color !== undefined ? props.color : ColorSet.navyColor(1),
//       textAlign: props.align ? props.align : "center",
//     }
//   },
// })

const baseStyle = { width: "100%", justifyContent: "center", alignItems: "center" }

const styles = {}
