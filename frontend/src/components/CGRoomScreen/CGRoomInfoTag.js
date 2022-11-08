import React from "react"

import { useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import { Modal, Portal, IconButton } from "react-native-paper"
import { RFPercentage } from "react-native-responsive-fontsize"

import ColorSet from "../../style/ColorSet"
import { DefaultImage } from "../../assets/images"
import AppBoldText from "../common/AppBoldText"
import AppText from "../common/AppText"
import RoomInfoModalContent from "./RoomInfoModalContent"

function CGRoomInfoTag({ roomInfo }) {
  const [visible, setVisible] = useState(false)

  function showModal() {
    setVisible(true)
  }

  function hideModal() {
    setVisible(false)
  }

  const containerStyle = {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
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
          <RoomInfoModalContent roomInfo={roomInfo} hideModal={hideModal} />
        </Modal>
      </Portal>
      <Pressable onPress={showModal} style={styles.btnContainer}>
        <View style={styles.imgBox}>
          <DefaultImage />
        </View>
        <View style={{ flex: 1 }}>
          <AppBoldText lineNumber={1}>{roomInfo.challengeTopic}</AppBoldText>
        </View>
        <IconButton icon="plus" iconColor={`${ColorSet.navyColor(1)}`} size={RFPercentage(3)} />
      </Pressable>
    </>
  )
}
export default CGRoomInfoTag

const styles = StyleSheet.create({
  btnContainer: {
    width: "100%",
    backgroundColor: "white",
    marginTop: "3%",
    height: RFPercentage(7),
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgBox: {
    width: RFPercentage(6),
    height: RFPercentage(6),
  },
})
