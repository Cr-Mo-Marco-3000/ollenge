import React, { useContext, useEffect, useState } from "react"

import { View, StyleSheet, Pressable, Image, TextInput, Alert, Keyboard } from "react-native"
import { useHeaderHeight } from "@react-navigation/elements"
import { Button } from "react-native-paper"
import * as ImagePicker from "expo-image-picker"

import ColorSet from "../../style/ColorSet"
import AppBoldText from "../common/AppBoldText"
import { PencilIcon } from "../../assets/images"
import { RFPercentage } from "react-native-responsive-fontsize"
import AppButton from "../common/AppButton"

import { AuthorizationInstance } from "../../api/settings"
import { RoomContext } from "../../../store/room-context"
import { useNavigation } from "@react-navigation/native"

function AuthScreen({ route }) {
  const instance = AuthorizationInstance()
  const navigation = useNavigation()

  const { showAuthModal } = route.params

  const roomCtx = useContext(RoomContext)
  const roomInfo = roomCtx.roomInfo
  const headerHight = useHeaderHeight()
  const [uri, setUri] = useState()
  const [base64, setBase64] = useState()
  const [inputText, setInputText] = useState("")
  const [challengeId, setChallengeId] = useState(roomInfo.challengeId)
  const [authType, setAuthType] = useState(roomInfo.authType)
  const [showKey, setShowKey] = useState(false)

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setShowKey(true)
    })
    Keyboard.addListener("keyboardDidHide", () => {
      setShowKey(false)
    })
  }, [])
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

  const authByImg = async () => {
    let urlType
    let dataForm
    if (authType === "feature") {
      urlType = "/auth/feature"
      dataForm = { challenge_id: challengeId, feed_img: base64, feed_content: inputText }
    } else if (authType === "classifi") {
      urlType = "/auth/classification"
      dataForm = {
        challenge_id: challengeId,
        feed_img: base64,
        feed_content: inputText,
        classification_type_id: roomInfo.classificationType.classificationTypeId, // classifi
      }
    } else {
      urlType = "/auth/common"
      dataForm = { challenge_id: challengeId, feed_img: base64, feed_content: inputText }
    }
    await instance
      .post(urlType, dataForm, {})
      .then((res) => {
        roomCtx.getUserList(challengeId)
        roomCtx.getTodayAuth(challengeId)
        showAuthModal()
        navigation.goBack("CGRoom")
      })
      .catch((err) => {
        const errcode = err.response.data.errcode
        if (errcode === 0) {
          Alert.alert("이미 오늘 인증은 완료되었습니다.")
        } else if (errcode === 1) {
          Alert.alert("입력이 바르지 않습니다")
        } else if (errcode === 2) {
          Alert.alert("사진이 업로드 되지 않습니다.") //S3 문제
        } else if (errcode === 3) {
          Alert.alert("인증되지 않은 유저입니다.") // auth Token  문제
        } else if (errcode === 4) {
          Alert.alert("챌린지에 참여한 인원이 아닙니다.")
        } else if (errcode === 5) {
          Alert.alert("인터넷 접속이 불량합니다.") // DB 접속 불량
        } else if (errcode === 6) {
          Alert.alert("인증 시간이 아닙니다.") // 인증 시간이 아닌 경우
        } else if (errcode === 7) {
          Alert.alert("특징점이 너무 적습니다.") // 기준 이미지 등록 err code
        } else if (errcode === 8) {
          Alert.alert("인증에 사용할 기준 사진이 없습니다.") // 기준 사진이 없는데 feature 인증 시도 시
        } else if (errcode === 9) {
          Alert.alert("키워드에 알맞지 않은 사진입니다.") // 키워드에 알맞지 classifi 인증 시도 시
        } else if (errcode === 10) {
          Alert.alert("서버 문제가 발생하였습니다. 잠시 후 시도해 주세요") // Clarifai 서버 문제, 혹은 그에 관한 문제
        } else if (errcode === 11) {
          Alert.alert("서버 문제가 발생하였습니다. 잠시 후 시도해 주세요") // classification id 입력이 바르지 않습니다.
        } else if (errcode === 12) {
          Alert.alert("사진이 일치하지 않습니다.") // 기준 사진과 일정 이상 일치하지 않는 겨우
        }
        navigation.goBack("CGRoom")
      })
  }

  return (
    <View style={styles.rootScreen}>
      <View style={{ height: headerHight }} />
      {showKey === false && (
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
      )}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", height: 30 }}>
          <View style={{ width: 30, height: 30, marginRight: "2%" }}>
            <PencilIcon />
          </View>
          <AppBoldText PxSize={18}>피드 내용 작성</AppBoldText>
        </View>
        <View style={{ marginVertical: "5%", flex: 1 }} value={inputText}>
          <TextInput onChangeText={inputHandler} multiline style={styles.descriptionBox} />
        </View>
      </View>
      <View style={{ width: "100%", height: RFPercentage(6), marginBottom: "5%" }}>
        <AppButton title={"인증 완료하기"} handler={authByImg} />
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
