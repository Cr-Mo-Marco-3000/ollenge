import React from "react"

import { StyleSheet, View, KeyboardAvoidingView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState, useContext } from "react"
import { RFPercentage } from "react-native-responsive-fontsize"

import ColorSet from "../../style/ColorSet"
import AppBoldText from "../common/AppBoldText"
import ImagePickerContainer from "../common/ImagePicker"
import TextInputContainer from "../common/TextInputContainer"
import AppButton from "../common/AppButton"
import { AuthorizationInstance } from "../../api/settings"
import { AuthContext } from "../../../store/auth-context"

function SignupScreen() {
  const instance = AuthorizationInstance()
  const authCxt = useContext(AuthContext)
  const [profileImageUri, setProfileImageUri] = useState()
  const [profileImageBase64, setProfileImageBase64] = useState()
  const [nicknameInput, setNicknameInput] = useState("")

  function profileImageUriHandler(uri) {
    setProfileImageUri(uri)
  }

  function profileImageBase64Handler(base64) {
    setProfileImageBase64(base64)
  }
  function nicknameInputHandler(text) {
    setNicknameInput(text)
  }

  function nicknameCheck(str) {
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/
    if (regex.test(str) && 2 <= str.length && str.length <= 12) {
      return true
    }
    return false
  }

  async function buttonHandler() {
    console.log(nicknameInput)
    const data = new Object()
    // 프로필 이미지 등록
    if (profileImageBase64) {
      await instance
        .post("/auth/upload", { profile_img: profileImageBase64 }, {})
        .then((res) => {
          data.profileImg = `${res.data.profile_img}`
        })
        .catch((err) => console.log(err))
    }
    // 닉네임
    if (nicknameCheck(nicknameInput)) {
      data.nickname = nicknameInput
      instance
        .patch("/api/user", data)
        .then((res) => {
          authCxt.signed("signedUser")
        })
        .catch((err) => {
          console.log(err)
          if (err.response.data.message === "이미 존재하는 닉네임입니다") {
            alert(err.response.data.message)
          }
        })
    } else {
      alert("닉네임 형식이 틀렸습니다")
    }
  }

  return (
    <LinearGradient style={styles.rootScreen} colors={["white", `${ColorSet.paleBlueColor(1)}`]}>
      <KeyboardAvoidingView style={{ width: "100%", flex: 1 }} behavior={"position"}>
        <View style={{ marginTop: "30%", width: "100%", alignItems: "center" }}>
          <AppBoldText>회원 정보 설정</AppBoldText>
        </View>
        <ImagePickerContainer
          imageUri={profileImageUri}
          imageUriHandler={profileImageUriHandler}
          imageBase64Handler={profileImageBase64Handler}
        />
        <View style={styles.textInputContainer}>
          <AppBoldText>닉네임</AppBoldText>
          <TextInputContainer
            inputHandler={nicknameInputHandler}
            inputText={nicknameInput}
            subminHandler={buttonHandler}
          />
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
