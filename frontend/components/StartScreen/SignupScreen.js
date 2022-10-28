import React from "react"

import { StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

import ColorSet from "../../style/ColorSet"
import AppBoldText from "../common/AppBoldText"
import ImagePickerContainer from "../common/ImagePicker"
import TextInputContainer from "../common/TextInputContainer"

function SignupScreen() {
  return (
    <LinearGradient style={styles.rootScreen} colors={["white", `${ColorSet.paleBlueColor(100)}`]}>
      <AppBoldText>회원 정보 설정</AppBoldText>
      <ImagePickerContainer />
      <TextInputContainer />
    </LinearGradient>
  )
}
export default SignupScreen

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
})
