import React from "react"

import { StyleSheet, View, Image, KeyboardAvoidingView, Platform } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState, useEffect } from "react"

import ColorSet from "../../style/ColorSet"
import defaultImage from "../../assets/images/default-image.png"
import AppBoldText from "../common/AppBoldText"
import ImagePickerContainer from "../common/ImagePicker"
import TextInputContainer from "../common/TextInputContainer"
import AppButton from "../common/AppButton"
import { RFPercentage } from "react-native-responsive-fontsize"

function SignupScreen() {
  const defaultImageUri = Image.resolveAssetSource(defaultImage).uri
  const [profileImageUri, setProfileImageUri] = useState(defaultImageUri)
  const [nicknameInput, setNicknameInput] = useState("")

  function profileImageUriHandler(uri) {
    setProfileImageUri(uri)
  }
  function nicknameInputHandler(text) {
    setNicknameInput(text)
  }

  function buttonHandler() {
    console.log("버튼 클릭")
  }

  return (
    <LinearGradient style={styles.rootScreen} colors={["white", `${ColorSet.paleBlueColor(100)}`]}>
      <KeyboardAvoidingView style={{ width: "100%", flex: 1 }} behavior={"position"}>
        <View style={{ marginTop: "30%", width: "100%", alignItems: "center" }}>
          <AppBoldText size={3}>회원 정보 설정</AppBoldText>
        </View>
        <ImagePickerContainer
          imageUri={profileImageUri}
          imageUriHandler={profileImageUriHandler}
          defaultImageUri={defaultImageUri}
        />
        <View style={styles.textInputContainer}>
          <AppBoldText size={3}>닉네임</AppBoldText>
          <TextInputContainer inputHandler={nicknameInputHandler} inputText={nicknameInput} />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton title={"완료"} handler={buttonHandler} />
        </View>
      </KeyboardAvoidingView>
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
  textInputContainer: {
    marginBottom: "5%",
    width: "100%",
    alignItems: "center",
    bottom: "5%",
    paddingHorizontal: "5%",
  },
  buttonContainer: {
    height: RFPercentage(8),
    width: "100%",
    bottom: "10%",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
})
