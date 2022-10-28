import React from "react"

import { StyleSheet, Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import styled from "styled-components/native"
import { RFPercentage } from "react-native-responsive-fontsize"
import { Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"

import ColorSet from "../../style/ColorSet"
import { OrangeLogo } from "../../assets/images"
import KakaoButton from "./KakaoButton"
import GoogleButton from "./GoogleButton"

function LoginScreen({ startScreenChange }) {
  const navigation = useNavigation()
  function screenHandler() {
    navigation.push("Signup")
  }

  const windowWidth = Dimensions.get("window").width
  const windowHeight = Dimensions.get("window").height
  return (
    <LinearGradient
      style={styles.rootScreen}
      colors={[`${ColorSet.paleBlueColor(1)}`, `${ColorSet.yellowColor(1)}`]}
      end={{ x: 0.5, y: 1 }}
    >
      <TopArea windowWidth={windowWidth} windowHeight={windowHeight}>
        <OrangeLogo />
      </TopArea>
      <MiddleArea>
        <Text style={styles.logoText}>오랭지</Text>
        <Text style={styles.subText}>오늘의 챌린지</Text>
      </MiddleArea>
      <BottomArea windowWidth={windowWidth} windowHeight={windowHeight}>
        <OrangeLogo />
      </BottomArea>
      <ButtonContainer windowHeight={windowHeight}>
        <KakaoButton handler={screenHandler} />
        <GoogleButton handler={startScreenChange} />
      </ButtonContainer>
    </LinearGradient>
  )
}
export default LoginScreen

// style code
const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    justifyContent: "center",
  },
  logoText: {
    textShadowColor: `${ColorSet.paleBlueColor(1)}`,
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 1,
    color: `${ColorSet.navyColor(1)}`,
    fontSize: RFPercentage(10),
    fontFamily: "Recipekorea",
  },
  subText: {
    color: `${ColorSet.navyColor(1)}`,
    fontSize: RFPercentage(4),
    fontFamily: "HyeminBold",
  },
})

const TopArea = styled.View`
  width: ${(props) => props.windowWidth * 0.32}%;
  top: ${(props) => (props.windowWidth / props.windowHeight) * -85}%;
  left: ${(props) => props.windowWidth * 0.32 * -0.3}%;
  transform: rotate(40deg);
  position: absolute;
`

const MiddleArea = styled.View`
  width: 100%;
  align-items: center;
`

const BottomArea = styled.View`
  width: ${(props) => props.windowWidth * 0.28}%;
  top: ${(props) => props.windowHeight * 0.05}%;
  left: ${(props) => props.windowWidth * 0.28 * 0.3}%;
  position: absolute;
  transform: rotate(-40deg) scaleX(-1);
`

const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  position: absolute;
  bottom: ${(props) => props.windowHeight * 0.01}%;
`
