import React, { useContext, useEffect, useState } from "react"
import { Provider, Portal, Modal, IconButton } from "react-native-paper"

import {
  View,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native"
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
import Loader from "../common/Loader"
import AppText from "../common/AppText"

function AuthScreen({ route }) {
  const instance = AuthorizationInstance()
  const navigation = useNavigation()

  const { showAuthModal } = route.params

  const [visible, setVisible] = React.useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = { backgroundColor: "white", padding: 10, borderRadius: 10 }

  const roomCtx = useContext(RoomContext)
  const roomInfo = roomCtx.roomInfo
  const headerHight = useHeaderHeight()
  const [uri, setUri] = useState()
  const [base64, setBase64] = useState()
  const [inputText, setInputText] = useState("")
  const [challengeId, setChallengeId] = useState(roomInfo.challengeId)
  const [authType, setAuthType] = useState(roomInfo.authType)
  const [showKey, setShowKey] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) {
      authByImg()
    }
  }, [loading])

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
      Alert.alert("????????? ????????? ???????????? ???????????????")
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
        navigation.goBack("CGRoom")
        showAuthModal()
      })
      .catch((err) => {
        const errcode = err.response.data.errcode
        if (errcode === 0) {
          Alert.alert("?????? ?????? ????????? ?????????????????????.")
        } else if (errcode === 1) {
          Alert.alert("????????? ????????? ????????????")
        } else if (errcode === 2) {
          Alert.alert("????????? ????????? ?????? ????????????.") //S3 ??????
        } else if (errcode === 3) {
          Alert.alert("???????????? ?????? ???????????????.") // auth Token  ??????
        } else if (errcode === 4) {
          Alert.alert("???????????? ????????? ????????? ????????????.")
        } else if (errcode === 5) {
          Alert.alert("????????? ????????? ???????????????.") // DB ?????? ??????
        } else if (errcode === 6) {
          Alert.alert("?????? ????????? ????????????.") // ?????? ????????? ?????? ??????
        } else if (errcode === 7) {
          Alert.alert("???????????? ?????? ????????????.") // ?????? ????????? ?????? err code
        } else if (errcode === 8) {
          Alert.alert("????????? ????????? ?????? ????????? ????????????.") // ?????? ????????? ????????? feature ?????? ?????? ???
        } else if (errcode === 9) {
          Alert.alert("???????????? ????????? ?????? ???????????????.") // ???????????? ????????? classifi ?????? ?????? ???
        } else if (errcode === 10) {
          Alert.alert("?????? ????????? ?????????????????????. ?????? ??? ????????? ?????????") // Clarifai ?????? ??????, ?????? ?????? ?????? ??????
        } else if (errcode === 11) {
          Alert.alert("?????? ????????? ?????????????????????. ?????? ??? ????????? ?????????") // classification id ????????? ????????? ????????????.
        } else if (errcode === 12) {
          Alert.alert("????????? ???????????? ????????????.") // ?????? ????????? ?????? ?????? ???????????? ?????? ??????
        }
        navigation.goBack("CGRoom")
      })
  }

  console.log(roomCtx.authImage)

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          style={{ alignItems: "center" }}
        >
          <View style={{ width: RFPercentage(40), height: RFPercentage(40) }}>
            <Image
              source={{ uri: roomCtx.authImage }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              resizeMode="cover"
            />
          </View>
        </Modal>
      </Portal>
      <KeyboardAvoidingView style={styles.rootScreen} behavior={"height"}>
        <View style={{ width: "100%", height: undefined }}>
          <Image source={{ uri: roomCtx.authImage }} resizeMode="cover" />
        </View>
        <View style={{ height: headerHight }} />
        {loading && <Loader />}
        {showKey === false && (
          <Pressable style={styles.authContainer} onPress={cameraHandler}>
            {uri ? (
              <Image
                source={{ uri: uri }}
                style={{ width: "100%", height: "100%", borderRadius: 10 }}
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
                ?????? ?????? ??????
              </Button>
            )}
          </Pressable>
        )}
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              height: 30,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 30, height: 30, marginRight: "2%" }}>
                <PencilIcon />
              </View>
              <AppBoldText PxSize={18}>?????? ?????? ??????</AppBoldText>
            </View>
            {roomCtx.authImage && (
              <Pressable onPress={showModal}>
                <AppText color={"orange"} size={2}>
                  ?????? ????????? ??????
                </AppText>
              </Pressable>
            )}
          </View>
          <View style={{ marginVertical: "5%", flex: 1 }} value={inputText}>
            <TextInput onChangeText={inputHandler} multiline style={styles.descriptionBox} />
          </View>
        </View>
        <View style={{ width: "100%", height: RFPercentage(6), marginBottom: "5%" }}>
          <AppButton
            title={"?????? ????????????"}
            handler={() => {
              setLoading(true)
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </Provider>
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
  imgBtn: {},
})
