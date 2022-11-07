import React, { useContext } from "react"

import { View, StyleSheet, KeyboardAvoidingView } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"

import ColorSet from "../../style/ColorSet"

import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import ImagePickerContainer from "../common/ImagePicker"
import TextInputContainer from "../common/TextInputContainer"
import AppButton from "../common/AppButton"
import { AuthorizationInstance } from "../../api/settings"
import { AuthContext } from "../../../store/auth-context"

function MyInfoEditScreen({ userInfo }) {
  const instance = AuthorizationInstance()
  const navigation = useNavigation()
  const authCtx = useContext(AuthContext)
  // props로 기본 유저 정보 받아와야하는 부분 (imageuri, nickname)
  const [profileImageUri, setProfileImageUri] = useState(userInfo.profileImg)
  const [profileImageBase64, setProfileImageBase64] = useState()
  const [nicknameInput, setNicknameInput] = useState(userInfo.nickname)

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
    const data = new Object()
    // 프로필 이미지 등록
    if (profileImageBase64) {
      await instance
        .post("/auth/upload", { profile_img: profileImageBase64 }, {})
        .then((res) => {
          data.profileImg = `${res.data.profile_img}`
        })
        .catch((err) => console.log(err))
    } else if (!profileImageBase64 && !profileImageUri) {
      data.profileImg = ""
    }
    // 닉네임
    if (nicknameInput !== userInfo.nickname) {
      if (nicknameCheck(nicknameInput)) {
        data.nickname = nicknameInput
      } else {
        alert("닉네임 형식이 틀렸습니다")
      }
    }
    if (data) {
      console.log(data)
      instance
        .patch("/api/user", data)
        .then((res) => {
          authCtx.getInfo()
          navigation.goBack("MyInfo")
        })
        .catch((err) => {
          console.log(err)
          if (err.response.data.message === "이미 존재하는 닉네임입니다") {
            alert(err.response.data.message)
          }
        })
    }
  }

  return (
    <View style={styles.rootContainer}>
      <KeyboardAvoidingView style={{ flex: 1, width: "100%" }}>
        <View style={{ marginTop: "15%", width: "100%", alignItems: "center" }}>
          <AppBoldText>회원 정보 수정</AppBoldText>
        </View>
        <ImagePickerContainer
          imageUri={profileImageUri}
          imageUriHandler={profileImageUriHandler}
          imageBase64Handler={profileImageBase64Handler}
        />
        <View style={styles.textInputContainer}>
          <AppBoldText>닉네임</AppBoldText>
          <TextInputContainer inputHandler={nicknameInputHandler} inputText={nicknameInput} />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton title={"수정"} handler={buttonHandler} />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
export default MyInfoEditScreen

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: ColorSet.paleBlueColor(1),
    paddingHorizontal: 20,
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputContainer: {
    marginBottom: "5%",
    width: "100%",
    alignItems: "center",
    bottom: "10%",
    paddingHorizontal: "5%",
  },
  buttonContainer: {
    height: RFPercentage(8),
    width: "100%",
    bottom: "20%",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
})
