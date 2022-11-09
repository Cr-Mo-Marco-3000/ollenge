import React from "react"

import { View, StyleSheet, Pressable } from "react-native"

import ColorSet from "../../style/ColorSet"
import { ExclamMartIcon } from "../../assets/images"
import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"

function ImageResistBtn({ navigation, roomInfo }) {
  console.log(11, roomInfo)
  return (
    <View style={styles.buttonBox}>
      <Pressable
        style={styles.innerButton}
        onPress={(roomInfo) => navigation.push("CGImg", { roomInfo: { roomInfo } })}
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
})
