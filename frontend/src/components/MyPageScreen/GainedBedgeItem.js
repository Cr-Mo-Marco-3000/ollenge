import React, { useContext, useRef, useState } from "react"

import { StyleSheet, Image, Pressable, View } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"
import LottieView from "lottie-react-native"
import { Modal, Portal } from "react-native-paper"

import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import { AuthContext } from "../../../store/auth-context"
import { AuthorizationInstance } from "../../api/settings"

function GainedBedgeItem({ type, typeData, grade, badgeId }) {
  const animation = useRef(null)
  const instance = AuthorizationInstance()
  const authCtx = useContext(AuthContext)
  const userBadge = authCtx.userInfo.selectedBadge
  const [visible, setVisible] = useState(false)

  let applied = false
  if (userBadge != null) {
    if (type == userBadge.type && grade == userBadge.grade - 1) {
      applied = true
    }
  }

  function showModal() {
    setVisible(true)
  }

  function hideModal() {
    setVisible(false)
  }

  const containerStyle = {
    backgroundColor: `${ColorSet.navyColor(1)}`,
    borderRadius: 10,
    alignItems: "center",
  }

  function pressHandler() {
    instance
      .patch("/api/user/badge", { badgeId: badgeId })
      .then((res) => {
        authCtx.getInfo()
        showModal()
      })
      .catch((err) => console.log(err))
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
            <AppBoldText color={"paleBlue"}>대표 뱃지로 설정되었습니다</AppBoldText>
            <Pressable onPress={hideModal} style={styles.btnBox}>
              <AppText color={"navy"} size={2}>
                확인
              </AppText>
            </Pressable>
          </View>
        </Modal>
      </Portal>
      <View style={styles.bedgeItem}>
        <Pressable
          style={styles.bedgeItem}
          android_ripple={{ color: `${ColorSet.greenColor(0.8)}` }}
          onLongPress={pressHandler}
        >
          <Image source={typeData.src[grade]} style={styles.bedgeImage} />
        </Pressable>
        <AppText size={2}>
          {typeData.title} {typeData.checkpoint[grade]}회 완주
        </AppText>
        {applied ? (
          <View style={styles.bedgeButton}>
            <AppText size={2}>착용 중</AppText>
          </View>
        ) : (
          <></>
        )}
      </View>
    </>
  )
}
export default GainedBedgeItem

const styles = StyleSheet.create({
  modalContainer: { padding: "5%", alignItems: "center" },
  btnBox: {
    marginTop: "5%",
    backgroundColor: `${ColorSet.paleBlueColor(1)}`,
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    borderRadius: 20,
  },
  bedgeItem: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  bedgeImage: {
    height: RFPercentage(8),
    width: RFPercentage(8),
  },
  bedgeButton: {
    position: "absolute",
    top: RFPercentage(3),
    backgroundColor: `${ColorSet.greenColor(1)}`,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 20,
    wordBreak: "nowrap",
  },
})
