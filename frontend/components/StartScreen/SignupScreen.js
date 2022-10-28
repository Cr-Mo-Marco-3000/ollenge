import React from "react"

import { StyleSheet, View, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"

import ColorSet from "../../style/ColorSet"
import defaultImage from "../../assets/images/default-image.png"
import AppBoldText from "../common/AppBoldText"
import ImagePickerContainer from "../common/ImagePicker"
import TextInputContainer from "../common/TextInputContainer"

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

  return (
    <LinearGradient style={styles.rootScreen} colors={["white", `${ColorSet.paleBlueColor(100)}`]}>
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
  },
})
