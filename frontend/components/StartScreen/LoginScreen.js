// import { Text } from "react-native-paper";
import { StyleSheet, Button, View, Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import styled, { css } from "styled-components/native"
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
      colors={["#EDF8FF", "#FCBE32"]}
      end={{ x: 0.5, y: 1 }}
    >
      <TopArea windowWidth={windowWidth} windowHeight={windowHeight}>
        <OrangeLogo />
      </TopArea>
      <MiddleArea>
        <Text
          style={{
            color: `${ColorSet.navyColor(100)}`,
            fontSize: RFPercentage(10),
          }}
        >
          오랭지
        </Text>
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
})

const TopArea = styled.View`
  width: ${(props) => props.windowWidth * 0.32}%;
  top: ${(props) => (props.windowWidth / props.windowHeight) * -850};
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
