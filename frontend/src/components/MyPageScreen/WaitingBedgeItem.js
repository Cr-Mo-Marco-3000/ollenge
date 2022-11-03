import React from "react"

import { StyleSheet, Image, Pressable, View } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"

import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"

function WaitingBedgeItem() {
  const iconName = "heart-icon-1"
  return (
    <Pressable style={styles.bedgeItem} android_ripple={{ color: `${ColorSet.whiteColor(1)}` }}>
      <Image source={require(`../../assets/images/${iconName}.png`)} style={styles.bedgeImage} />
      <AppText size={2}>설명설명쑤얼라</AppText>
      <View style={styles.bedgeButton}>
        <AppText size={2} color={"white"}>
          획득하기
        </AppText>
      </View>
    </Pressable>
  )
}
export default WaitingBedgeItem

const styles = StyleSheet.create({
  bedgeItem: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
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