import React, { useState } from "react"

import { Portal, Modal, Button } from "react-native-paper"
import { RFPercentage } from "react-native-responsive-fontsize"
import { Pressable, View, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"

import ColorSet from "../../style/ColorSet"
import AppText from "./../common/AppText"
import AppBoldText from "../common/AppBoldText"
import { AuthorizationInstance } from "../../api/settings"

function CGLeaveBtn({ challengeId, userNum }) {
  const navigation = useNavigation()
  const instance = AuthorizationInstance()
  const [visible, setVisible] = useState(false)

  function showModal() {
    setVisible(true)
  }

  function hideModal() {
    setVisible(false)
  }

  const containerStyle = {
    backgroundColor: "white",
    borderRadius: 10,
  }

  function leaveHandler() {
    instance
      .delete(`/api/challenge/${challengeId}`)
      .then((res) => {
        navigation.goBack("CGList")
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: "5%",
            paddingVertical: "10%",
          }}
        >
          <View style={styles.modalContainer}>
            <AppBoldText>챌린지를 시작하지 않고</AppBoldText>
            <AppBoldText>떠나시겠어요?</AppBoldText>
            {userNum == 1 ? (
              <View style={{ marginTop: "5%" }}>
                <AppText size={2} color={"deepOrange"}>
                  당신이 떠나시면 해당 챌린지는 삭제됩니다
                </AppText>
              </View>
            ) : null}
            <View style={{ marginTop: "10%" }}>
              <Button
                icon="door-open"
                mode="contained"
                onPress={leaveHandler}
                buttonColor={`${ColorSet.paleBlueColor(1)}`}
                textColor={`${ColorSet.navyColor(1)}`}
                theme={{
                  fonts: {
                    labelLarge: {
                      fontFamily: "HyeminBold",
                    },
                  },
                }}
              >
                떠나기
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
      <Pressable style={styles.btnContainer} onPress={showModal}>
        <View>
          <AppText color={"white"} pxSize={16}>
            포기
          </AppText>
        </View>
      </Pressable>
    </>
  )
}
export default CGLeaveBtn

const styles = StyleSheet.create({
  btnContainer: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    backgroundColor: `${ColorSet.navyColor(1)}`,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 200,
    position: "absolute",
    right: 10,
    bottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContainer: {
    alignItems: "center",
    paddingHorizontal: "8%",
    paddingTop: "5%",
    paddingBottom: "2%",
  },
})
