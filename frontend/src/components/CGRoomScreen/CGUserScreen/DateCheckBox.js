import React from "react"

import { StyleSheet, View } from "react-native"
import AppText from "../../common/AppText"
import { DefaultImage } from "../../../assets/images"
import AppBoldText from "../../common/AppBoldText"
import { RFPercentage } from "react-native-responsive-fontsize"

function DateCheckBox({ day, checked }) {
  return (
    <View style={styles.boxContainer}>
      <AppText size={2} color={"darkGray"}>
        {day}
      </AppText>
      <View style={styles.checkBox}>
        {checked ? (
          <DefaultImage />
        ) : (
          <AppBoldText color={"orange"} size={2}>
            X
          </AppBoldText>
        )}
      </View>
    </View>
  )
}
export default DateCheckBox

const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    marginTop: "3%",
    alignItems: "center",
  },
  checkBox: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
})
