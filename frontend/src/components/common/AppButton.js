import React from "react"

import { Pressable, View, StyleSheet } from "react-native"

import ColorSet from "../../style/ColorSet"
import AppText from "./AppText"
import AppBoldText from "./AppBoldText"

function AppButton(props) {
  const backColor = props.backColor ? props.backColor : "orange"
  const fontColor = props.fontColor ? props.fontColor : "white"
  const pxSize = props.pxSize ? props.pxSize : 24
  const blodFlag = props.weight ? props.weight : "bold"
  const theme = {
    orange: ColorSet.orangeColor(1),
    navy: ColorSet.navyColor(1),
    yellow: ColorSet.yellowColor(1),
    paleBlue: ColorSet.paleBlueColor(1),
    green: ColorSet.greenColor(1),
    black: ColorSet.blackColor(1),
    deepOrange: ColorSet.deepOrangeColor(1),
    white: ColorSet.whiteColor(1),
    pinkBage: ColorSet.pinkBageColor(1),
  }

  const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: theme[backColor],
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
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
  })

  return (
    <Pressable style={styles.buttonContainer} onPress={props.handler}>
      <View>
        {blodFlag === "bold" ? (
          <AppBoldText color={fontColor} pxSize={pxSize}>
            {props.title}
          </AppBoldText>
        ) : (
          <AppText color={fontColor} pxSize={pxSize}>
            {props.title}
          </AppText>
        )}
      </View>
    </Pressable>
  )
}

export default AppButton
