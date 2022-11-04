/** react-native 시스템 Import */
import React from "react"
import { Pressable, View, Text, KeyboardAvoidingView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

/** Component Import */
import ColorSet from "../../style/ColorSet"

/** 페이지에서 사용할 스타일들 정리 */
import { StyleSheet } from "react-native"
import DeviceInfo from "../../style/DeviceInfo"
import { useNavigation } from "@react-navigation/native"

const { dw, dh } = DeviceInfo

const CancelBtn = () => {
  return (
    <Pressable onPress={() => console.log("챌린지 생성 취소는 아직")}>
      <Text style={styles.CancelBtn}>챌린지 생성 취소</Text>
    </Pressable>
  )
}

const NextBtn = ({ toNext }) => {
  const navigation = useNavigation()
  return (
    <Pressable style={styles.NextBtn} onPress={() => navigation.navigate(toNext)}>
      <Text style={styles.NextBtnText}>다음</Text>
    </Pressable>
  )
}

/** 모든 페이지의 기본 배경 설정 */
export default function PageBase(props) {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[`${ColorSet.paleBlueColor(1)}`, `${ColorSet.yellowColor(1)}`]}
      end={{ x: 0.5, y: 1 }}
      locations={[0.1, 1]}
    >
      <View style={styles.TopArea}>
        <View style={styles.ContentArea}>{props.children}</View>

        <View style={styles.BottomArea}>
          <NextBtn toNext={props.toNext} />
          <CancelBtn />
        </View>
      </View>
    </LinearGradient>
  )
}

export const fontStyles = StyleSheet.create({
  HyeminBold: (props = {}) => {
    return {
      fontFamily: "HyeminBold",
      fontSize: props.size !== undefined ? (props.size * dw) / 100 : 24,
      fontWeight: props.bold !== undefined ? props.bold : "100",
      color: props.color !== undefined ? props.color : ColorSet.navyColor(1),
      textAlign: props.align ? props.align : "center",
    }
  },

  Hyemin: (props = {}) => {
    return {
      fontFamily: "Hyemin",
      fontSize: props.size !== undefined ? (props.size * dw) / 100 : 24,
      fontWeight: props.bold !== undefined ? props.bold : "100",
      color: props.color !== undefined ? props.color : ColorSet.navyColor(1),
      textAlign: props.align ? props.align : "center",
    }
  },
})

const baseStyle = { width: "100%", justifyContent: "center", alignItems: "center" }

const styles = {
  TopArea: { ...baseStyle, flex: 1, padding: "4%" },

  ContentArea: { ...baseStyle, flex: 1 },

  BottomArea: { ...baseStyle },

  CancelBtn: {
    fontSize: dw * 0.05,
    textDecorationLine: "underline",
    textAlign: "center",
  },

  NextBtn: {
    ...baseStyle,
    backgroundColor: ColorSet.orangeColor(1),
    borderRadius: 15,
    padding: 8,
    marginBottom: 10,
  },
  NextBtnText: {
    fontSize: dw * 0.08,
    color: ColorSet.whiteColor(1),
  },
}
