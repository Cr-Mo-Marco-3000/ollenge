import React from "react"

import { StyleSheet, Image, View } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"

import AppText from "../common/AppText"

function NotGainedBedgeItem() {
  const iconName = "heart-icon-1"
  return (
    <View style={styles.bedgeItem}>
      <Image source={require(`../../assets/images/${iconName}.png`)} style={styles.bedgeImage} />
      <AppText size={2}>설명설명쑤얼라</AppText>
    </View>
  )
}
export default NotGainedBedgeItem

const styles = StyleSheet.create({
  bedgeItem: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  bedgeImage: {
    height: RFPercentage(8),
    width: RFPercentage(8),
    tintColor: "gray",
    opacity: 0.3,
  },
})
