import React, { useContext } from "react"

import { StyleSheet, Image, Pressable, View } from "react-native"
import { Modal, Portal } from "react-native-paper"
import { RFPercentage } from "react-native-responsive-fontsize"
import LottieView from "lottie-react-native"
import { useRef, useState } from "react"

import { PartyIcon } from "../../assets/images"
import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import { AuthContext } from "../../../store/auth-context"
import { AuthorizationInstance } from "../../api/settings"

function WaitingBedgeItem({ typeData, grade, badgeId }) {
  const animation = useRef(null)
  const authCtx = useContext(AuthContext)
  const instance = AuthorizationInstance()
  const [visible, setVisible] = useState(false)
  const userId = authCtx.userInfo.userId

  function showModal() {
    setVisible(true)
  }

  function hideModal() {
    authCtx.getBadgeData(userId)
    setVisible(false)
  }

  const containerStyle = {
    backgroundColor: `${ColorSet.navyColor(1)}`,
    borderRadius: 10,
    alignItems: "center",
  }

  function pressHandler() {
    instance
      .patch("/api/badge", { badgeId: badgeId })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    showModal()
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
            source={require("../../assets/Lottie/Confeti.json")}
          />
        ) : null}
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          style={{ paddingHorizontal: "15%" }}
        >
          <View style={styles.modalContainer}>
            <View style={{ width: RFPercentage(8), height: RFPercentage(8) }}>
              <PartyIcon />
            </View>
            <AppBoldText color={"paleBlue"}>뱃지 획득을 축하드려요!</AppBoldText>
            <AppText pxSize={20} color={"paleBlue"}>
              앞으로도 더욱 힘내봅시다
            </AppText>
            <Pressable onPress={hideModal} style={styles.btnBox}>
              <AppText color={"navy"} size={2}>
                확인
              </AppText>
            </Pressable>
          </View>
        </Modal>
      </Portal>
      <Pressable
        style={styles.bedgeItem}
        android_ripple={{ color: `${ColorSet.whiteColor(1)}` }}
        onPress={pressHandler}
      >
        <Image source={typeData.src[grade]} style={styles.bedgeImage} />
        <AppText size={2}>
          {typeData.title} {typeData.checkpoint[grade]}회 완주
        </AppText>
        <View style={styles.bedgeButton}>
          <AppText size={2} color={"white"}>
            획득하기
          </AppText>
        </View>
      </Pressable>
    </>
  )
}
export default WaitingBedgeItem

const styles = StyleSheet.create({
  modalContainer: { padding: "5%", alignItems: "center" },
  bedgeItem: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  btnBox: {
    marginTop: "5%",
    backgroundColor: `${ColorSet.paleBlueColor(1)}`,
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    borderRadius: 20,
  },
  bedgeImage: {
    height: RFPercentage(8),
    width: RFPercentage(8),
    opacity: 0.4,
  },
  bedgeButton: {
    position: "absolute",
    top: RFPercentage(3),
    backgroundColor: `${ColorSet.navyColor(1)}`,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 20,
    wordBreak: "nowrap",
  },
})
