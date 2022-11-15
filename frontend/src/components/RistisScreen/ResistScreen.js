import React, { useContext, useState } from "react"

import AppText from "../common/AppText"
import AppBoldText from "./../common/AppBoldText"
import AppButton from "../common/AppButton"
import ColorSet from "../../style/ColorSet"

import { View, StyleSheet, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { RFPercentage } from "react-native-responsive-fontsize"
import * as ImagePicker from "expo-image-picker"
import { Provider as FeedProvider, Portal, Modal, DefaultTheme } from "react-native-paper"
import ResistModalContent from "./ResistModalContent"
import { RoomContext } from "../../../store/room-context"

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backdrop: `${ColorSet.navyColor(0.5)}`,
  },
}

function ResistScreen({ route }) {
  const roomCtx = useContext(RoomContext)
  const roomInfo = roomCtx.roomInfo
  const [uri, setUri] = useState()
  const [base64, setBase64] = useState()
  const [visible, setVisible] = useState(false)
  const [challengeId, setChallengeId] = useState(roomInfo.challengeId)

  const { showResistModal } = route.params

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
      showModal()
    }
  }

  function showModal() {
    setVisible(true)
  }

  function hideModal() {
    setVisible(false)
  }

  function resetCamera() {
    setUri()
    setBase64()
    hideModal()
    cameraHandler()
  }

  const containerStyle = {
    backgroundColor: `${ColorSet.paleBlueColor(1)}`,
    width: "100%",
    height: "100%",
    flex: 1,
  }
  return (
    <FeedProvider theme={theme}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          style={{ alignItems: "center", padding: 0, margin: 0, flex: 1, height: "100%" }}
        >
          <ResistModalContent
            uri={uri}
            base64={base64}
            challengeId={challengeId}
            resetCamera={resetCamera}
            showResistModal={showResistModal}
          />
        </Modal>
      </Portal>
      <LinearGradient
        colors={[
          `${ColorSet.paleBlueColor(1)}`,
          `${ColorSet.paleBlueColor(1)}`,
          `${ColorSet.yellowColor(1)}`,
        ]}
        style={{ flex: 1, alignItems: "center" }}
      >
        {/* <TopMargin /> */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <AppBoldText>인증 진행 시 최초 등록 이미지와의</AppBoldText>
            <AppBoldText>유사성을 판별해 인증을 검증합니다</AppBoldText>
            <View style={{ marginTop: "3%" }}>
              <AppText pxSize={18}>앞으로 챌린지를 진행할 때,</AppText>
              <AppText pxSize={18}>인증을 진행하기 위해서는</AppText>
              <AppText pxSize={18}>최초 등록해둔 물체를 촬영해야 합니다</AppText>
            </View>
            <View style={{ width: "100%", alignItems: "center", marginTop: "5%" }}>
              <View style={styles.textbox}>
                <AppText pxSize={18}>챌린지와 관련된 물체를 등록해 주세요</AppText>
              </View>
              <View style={styles.textbox}>
                <AppText pxSize={18}>해당 사항은 이후 변경 불가합니다</AppText>
              </View>
              <View style={styles.textbox}>
                <AppText pxSize={18}>등록하신 이미지는 피드에 업로드됩니다</AppText>
              </View>
            </View>
            <View style={styles.buttonBox}>
              <AppButton title={"인증 이미지 등록하기"} handler={cameraHandler}></AppButton>
            </View>
          </View>
        </View>
      </LinearGradient>
    </FeedProvider>
  )
}
export default ResistScreen

const styles = StyleSheet.create({
  textbox: {
    backgroundColor: "#FFBF99",
    width: "90%",
    paddingVertical: "2%",
    borderRadius: 20,
    marginBottom: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonBox: {
    marginTop: "5%",
    width: "90%",
    height: RFPercentage(7),
  },
})
