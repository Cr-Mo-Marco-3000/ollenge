import React from "react"

import { Image, Pressable, StyleSheet, View } from "react-native"
import AppText from "../common/AppText"
import AppButton from "../common/AppButton"
import { RFPercentage } from "react-native-responsive-fontsize"

function ResistModalContent({ uri, base64, resetCamera }) {
  return (
    <View style={{ paddingHorizontal: "5%" }}>
      <View style={styles.imgBox}>
        <Image
          source={{ uri: uri }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%", borderRadius: 20 }}
        />
      </View>
      <Pressable style={styles.cameraBtn} onPress={resetCamera}>
        <AppText>다시 찍기</AppText>
      </Pressable>
      <View style={styles.resistBtn}>
        <AppButton title={"인증 이미지 제출"} backColor={"navy"} handler={() => {}}></AppButton>
      </View>
    </View>
  )
}
export default ResistModalContent

const styles = StyleSheet.create({
  imgBox: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cameraBtn: {
    marginTop: "5%",
    marginBottom: "10%",
  },
  resistBtn: {
    width: "100%",
    height: RFPercentage(7),
  },
})
