import React from "react"

import { View, StyleSheet } from "react-native"
import * as Clipboard from "expo-clipboard"
import { useState } from "react"
import { Portal, Modal, Button } from "react-native-paper"

import AppButton from "../common/AppButton"
import AppBoldText from "../common/AppBoldText"
import AppText from "../common/AppText"
import ColorSet from "../../style/ColorSet"

function InviteCodeBtn({ inviteCode }) {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(inviteCode)
    hideModal()
  }
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
            <AppText size={2}>초대코드를 공유하여</AppText>
            <AppText size={2}> 친구들과 챌린지를 즐겨보세요!</AppText>
            <View style={{ marginVertical: "5%" }}>
              <AppBoldText color={"orange"}>{inviteCode}</AppBoldText>
            </View>
            <Button
              icon="cat"
              mode="contained"
              onPress={copyToClipboard}
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
              복사하기
            </Button>
          </View>
        </Modal>
      </Portal>
      <View style={styles.buttonBox}>
        <AppButton
          title={"초대 코드 확인하기"}
          handler={showModal}
          backColor={"yellow"}
          fontColor={"navy"}
          weight={1}
          pxSize={20}
        />
      </View>
    </>
  )
}
export default InviteCodeBtn

const styles = StyleSheet.create({
  buttonBox: {
    width: "100%",
    height: 45,
    marginTop: 10,
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "10%",
    paddingTop: "10%",
    paddingBottom: "5%",
  },
})
