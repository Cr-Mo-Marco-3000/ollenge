import React from "react"

import LottieView from "lottie-react-native"
import { useRef } from "react"
import { StyleSheet, View } from "react-native"
import ColorSet from "../../style/ColorSet"
import AppBoldText from "./AppBoldText"
import { LinearGradient } from "expo-linear-gradient"
import { RFPercentage } from "react-native-responsive-fontsize"

function Loader() {
  const animation = useRef(null)
  return (
    <LinearGradient
      style={styles.loaderContainer}
      colors={[`${ColorSet.paleBlueColor(0.8)}`, `${ColorSet.yellowColor(1)}`]}
    >
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: RFPercentage(40),
          height: undefined,
        }}
        resizeMode="cover"
        source={require("../../assets/Lottie/walkingOrange.json")}
      />
      <View style={{ position: "relative", bottom: "20%" }}>
        <AppBoldText>로딩중...</AppBoldText>
      </View>
    </LinearGradient>
  )
}
export default Loader

const styles = StyleSheet.create({
  loaderContainer: {
    position: "absolute",
    height: RFPercentage(40),
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    top: "30%",
    left: "10%",
    zIndex: 10,
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
})
