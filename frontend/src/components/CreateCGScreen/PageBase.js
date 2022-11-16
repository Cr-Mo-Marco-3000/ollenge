/** react-native 시스템 Import */
import React, { useEffect, useState } from "react"
import {
  Pressable,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"

/** Component Import */
import ColorSet from "../../style/ColorSet"

/** 페이지에서 사용할 스타일들 정리 */
import { StyleSheet } from "react-native"
import DeviceInfo, { dh } from "../../style/DeviceInfo"
import { useNavigation } from "@react-navigation/native"

const { dw } = DeviceInfo

const CancelBtn = (props) => {
  return (
    <Pressable onPress={props.cancelAll}>
      <Text style={styles.CancelBtn}>챌린지 생성 취소</Text>
    </Pressable>
  )
}

const NextBtn = ({ toNext, disabled, toSubmit }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      style={{ ...styles.NextBtn, backgroundColor: disabled ? "grey" : ColorSet.orangeColor(1) }}
      onPress={() => {
        if (!disabled) {
          if (toNext === "Submit") {
            toSubmit()
          } else {
            navigation.navigate(toNext)
          }
        }
      }}
    >
      <Text style={styles.NextBtnText}>{toNext !== "Submit" ? "다음" : "챌린지 생성"}</Text>
    </TouchableOpacity>
  )
}

/** 모든 페이지의 기본 배경 설정 */
export default function PageBase(props) {
  const [showKey, setShowKey] = useState(false)

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setShowKey(true)
    })
    Keyboard.addListener("keyboardDidHide", () => {
      setShowKey(false)
    })
  }, [])
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        style={{ flex: 1, overflow: "hidden" }}
        colors={[`${ColorSet.paleBlueColor(1)}`, `${ColorSet.yellowColor(1)}`]}
        end={{ x: 0.5, y: 1 }}
        locations={[0.2, 1]}
      >
        <View style={styles.TopArea}>
          <View style={styles.ContentArea}>{props.children}</View>
          {showKey !== true && props.hideBtn !== true && (
            <View style={styles.BottomArea}>
              <NextBtn
                toNext={props.toNext}
                disabled={props.disabled}
                toSubmit={props.toSubmit ? props.toSubmit : false}
              />
              {/* props.disabled */}
              <CancelBtn cancelAll={props.cancelAll} />
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

export const fontStyles = StyleSheet.create({
  HyeminBold: (props) => {
    return {
      fontFamily: "HyeminBold",
      fontSize: props.size !== undefined ? (props.size * dw) / 100 : 24,
      fontWeight: props.bold !== undefined ? props.bold : "100",
      color: props.color !== undefined ? props.color : ColorSet.navyColor(1),
      textAlign: props.align ? props.align : "center",
    }
  },

  Hyemin: (props) => {
    return {
      fontFamily: "HyeminRegular",
      fontSize: props.size !== undefined ? (props.size * dw) / 100 : 24,
      fontWeight: props.bold !== undefined ? props.bold : "100",
      color: props.color !== undefined ? props.color : ColorSet.navyColor(1),
      textAlign: props.align ? props.align : "center",
    }
  },
})

const baseStyle = { width: "100%", justifyContent: "center", alignItems: "center" }

const styles = {
  TopArea: { ...baseStyle, flex: 1, padding: "4%", marginTop: 90 },

  ContentArea: { ...baseStyle, flex: 1 },

  BottomArea: { ...baseStyle },

  CancelBtn: {
    fontSize: dw * 0.05,
    padding: dh * 0.002,
    textAlign: "center",
  },

  NextBtn: {
    ...baseStyle,
    borderRadius: 10,
    padding: 12,
    marginBottom: dh * 0.01,
    elevation: 12,
  },
  NextBtnText: {
    ...fontStyles.HyeminBold({ size: 6, color: "white" }),
  },
}
