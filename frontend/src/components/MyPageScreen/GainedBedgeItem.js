import React from "react"

import { StyleSheet, Image, Pressable, View } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"

import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"

function GainedBedgeItem(props) {
  const iconName = "heart-icon-1"
  const applied = props.applied ? props.applied : false
  return (
    <Pressable style={styles.bedgeItem}>
      <Image source={require(`../../assets/images/${iconName}.png`)} style={styles.bedgeImage} />
      <AppText size={2}>설명설명쑤얼라</AppText>
      {applied ? (
        <View style={styles.bedgeButton}>
          <AppText size={2}>착용 중</AppText>
        </View>
      ) : (
        <></>
      )}
    </Pressable>
  )
}
export default GainedBedgeItem

const styles = StyleSheet.create({
  bedgeItem: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
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
