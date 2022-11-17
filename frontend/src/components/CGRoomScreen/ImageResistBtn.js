import React, { useContext, useRef, useState } from "react"

import { View, StyleSheet, Pressable } from "react-native"
import { Modal, Portal } from "react-native-paper"
import LottieView from "lottie-react-native"

import ColorSet from "../../style/ColorSet"
import { ExclamMartIcon } from "../../assets/images"
import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import { RoomContext } from "./../../../store/room-context"

function ImageResistBtn({ navigation }) {
  const animation = useRef(null)
  const [visible, setVisible] = useState(false)
  const roomCtx = useContext(RoomContext)
  const challengeId = roomCtx.roomInfo.challengeId

  function showResistModal() {
    setVisible(true)
  }

  function hideModal() {
    setVisible(false)
    roomCtx.getImgResist(challengeId)
  }

  const containerStyle = {
    backgroundColor: `${ColorSet.paleBlueColor(1)}`,
    borderRadius: 10,
    alignItems: "center",
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
            source={require("../../assets/Lottie/smallConfeti.json")}
          />
        ) : null}
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          style={{ paddingHorizontal: "10%" }}
        >
          <View style={styles.modalContainer}>
            <AppBoldText pxSize={20}>인증 이미지 등록이{"\n"}완료되었습니다</AppBoldText>
            <Pressable onPress={hideModal} style={styles.btnBox}>
              <AppText color={"paleBlue"} size={2}>
                확인
              </AppText>
            </Pressable>
          </View>
        </Modal>
      </Portal>
      <View style={styles.buttonBox}>
        <Pressable
          style={styles.innerButton}
          onPress={() => navigation.navigate("CGImg", { showResistModal: showResistModal })}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: 30, height: 30 }}>
              <ExclamMartIcon />
            </View>
            <View style={{ alignItems: "flex-start", marginLeft: 5 }}>
              <AppText pxSize={15}>아직 인증에 사용할</AppText>
              <AppText pxSize={15}>기본 이미지를 입력하지 않았어요!</AppText>
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: "2%" }}>
            <AppBoldText color={"hotPink"} pxSize={18}>
              인증 이미지 입력하기
            </AppBoldText>
          </View>
        </Pressable>
      </View>
    </>
  )
}
export default ImageResistBtn

const styles = StyleSheet.create({
  buttonBox: {
    width: "100%",
    height: 80,
    marginTop: "3%",
    backgroundColor: `${ColorSet.pinkBageColor(1)}`,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerButton: {
    paddingHorizontal: "3%",
    paddingTop: "2%",
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
