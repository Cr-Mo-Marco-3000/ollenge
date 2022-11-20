import React, { useContext } from "react"

import { View, StyleSheet, Pressable } from "react-native"
import { Modal, Portal } from "react-native-paper"
import LottieView from "lottie-react-native"
import { useRef, useState } from "react"
import { RFPercentage } from "react-native-responsive-fontsize"

import { HappyIcon } from "../../assets/images"
import AppButton from "../common/AppButton"
import AppBoldText from "../common/AppBoldText"
import AppText from "../common/AppText"
import { RoomContext } from "../../../store/room-context"

import ColorSet from "../../style/ColorSet"

function CGAuthBtn({ navigation }) {
  const animation = useRef(null)
  const [visible, setVisible] = useState(false)
  const roomCtx = useContext(RoomContext)
  const challengeId = roomCtx.roomInfo.challengeId

  function showAuthModal() {
    setVisible(true)
  }
  console.log(visible)

  function hideModal() {
    setVisible(false)
    roomCtx.getUserList(challengeId)
    roomCtx.getTodayAuth(challengeId)
  }

  const containerStyle = {
    backgroundColor: `${ColorSet.paleBlueColor(1)}`,
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  }

  return (
    <>
      <Portal>
        {visible ? (
          <LottieView
            autoPlay
            loop={false}
            ref={animation}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
            }}
            source={require("../../assets/Lottie/blueConfeti.json")}
          />
        ) : null}
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          style={{ paddingHorizontal: "10%" }}
        >
          <View style={styles.modalContainer}>
            <View style={{ width: RFPercentage(8), height: RFPercentage(8) }}>
              <HappyIcon />
            </View>
            <AppBoldText>금일 인증이 완료되었습니다</AppBoldText>
            <AppText pxSize={20}>내일도 힘내서 챌린지를 완주해봐요!</AppText>
            <Pressable onPress={hideModal} style={styles.btnBox}>
              <AppText color={"paleBlue"} size={2}>
                확인
              </AppText>
            </Pressable>
          </View>
        </Modal>
      </Portal>
      <View style={styles.buttonBox}>
        <AppButton
          title={"오늘 챌린지 인증하기"}
          weight={1}
          pxSize={20}
          handler={() => navigation.navigate("CGAuth", { showAuthModal: showAuthModal })}
        ></AppButton>
      </View>
    </>
  )
}
export default CGAuthBtn

const styles = StyleSheet.create({
  buttonBox: {
    width: "100%",
    height: 45,
    marginTop: 10,
  },
  modalContainer: { padding: "5%", alignItems: "center" },
  btnBox: {
    marginTop: "5%",
    backgroundColor: `${ColorSet.navyColor(1)}`,
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    borderRadius: 20,
  },
})
