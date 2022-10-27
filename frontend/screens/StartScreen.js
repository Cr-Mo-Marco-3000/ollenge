import { Text } from "react-native-paper"
import { StyleSheet, Button, View, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import styled, { css } from "styled-components/native"

import { OrangeLogo } from "../assets/images/index"

function StartScreen({ startScreenChange }) {
  return (
    <LinearGradient
      style={styles.rootScreen}
      colors={["#EDF8FF", "#FCBE32"]}
      end={{ x: 0.5, y: 1 }}
    >
      <TopArea>
        <OrangeLogo />
      </TopArea>
    </LinearGradient>
  )
}
export default StartScreen

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    justifyContent: "center",
  },
})

const TopArea = styled.View`
  position: fixed;
  top: 0;
  width: 100%;
`
