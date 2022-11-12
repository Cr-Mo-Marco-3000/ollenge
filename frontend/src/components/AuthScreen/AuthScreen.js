import React, { useState } from "react"

import { View, StyleSheet, Pressable, Image, TextInput } from "react-native"
import { useHeaderHeight } from "@react-navigation/elements"
import { Button } from "react-native-paper"
import * as ImagePicker from "expo-image-picker"

import ColorSet from "../../style/ColorSet"
import AppBoldText from "../common/AppBoldText"
import { PencilIcon } from "../../assets/images"
import { RFPercentage } from "react-native-responsive-fontsize"
import AppButton from "../common/AppButton"

function AuthScreen() {
  const headerHight = useHeaderHeight()
  const [uri, setUri] = useState()
  const [base64, setBase64] = useState()
  const [inputText, setInputText] = useState("")

  const cameraHandler = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    if (permissionResult.granted == false) {
      Alert.alert("카메라 권한을 승인하지 않았습니다")
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.3,
    })
    if (!result.cancelled) {
      setUri(result.uri)
      setBase64(result.base64)
    }
  }

  function inputHandler(text) {
    setInputText(text)
  }

  return (
    <View style={styles.rootScreen}>
      <View style={{ height: headerHight }} />
      <Pressable style={styles.authContainer} onPress={cameraHandler}>
        {uri ? (
          <Image
            source={{ uri: uri }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        ) : (
          <Button
            icon="camera"
            textColor={`${ColorSet.paleBlueColor(1)}`}
            theme={{
              fonts: {
                labelLarge: {
                  fontFamily: "HyeminBold",
                  fontSize: 18,
                },
              },
            }}
          >
            인증 사진 촬영
          </Button>
        )}
      </Pressable>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", height: 30 }}>
          <View style={{ width: 30, height: 30, marginRight: "2%" }}>
            <PencilIcon />
          </View>
          <AppBoldText PxSize={18}>피드 내용 작성</AppBoldText>
        </View>
        <View
          style={{ marginVertical: "5%", flex: 1 }}
          value={inputText}
          onChangeText={inputHandler}
        >
          <TextInput multiline style={styles.descriptionBox} />
        </View>
      </View>
      <View style={{ width: "100%", height: RFPercentage(6), marginBottom: "5%" }}>
        <AppButton title={"인증 완료하기"} handler={() => {}} />
      </View>
    </View>
  )
}
export default AuthScreen

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: `${ColorSet.paleBlueColor(1)}`,
    paddingHorizontal: "5%",
  },
  authContainer: {
    marginVertical: "5%",
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    backgroundColor: `${ColorSet.navyColor(0.8)}`,
    borderRadius: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  descriptionBox: {
    backgroundColor: `${ColorSet.whiteColor(1)}`,
    flex: 1,
    fontFamily: "HyeminRegular",
    color: `${ColorSet.navyColor(1)}`,
    borderRadius: 10,
    paddingHorizontal: "5%",
    paddingTop: "5%",
    fontSize: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
