// import { Text } from "react-native-paper";
import React from "react"

import { StyleSheet, Button, View, Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import styled, { css } from "styled-components/native"
import { RFPercentage } from "react-native-responsive-fontsize"
import { Dimensions } from "react-native"
import { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ColorSet from "../style/ColorSet"
import { OrangeLogo } from "../assets/images/index"
import LoginScreen from "../components/StartScreen/LoginScreen"
import SignupScreen from "../components/StartScreen/SignupScreen"
import KakaloLoginScreen from "../components/StartScreen/KakaoLoginScreen"

const Stack = createNativeStackNavigator()

function StartScreen({ startScreenChange }) {
  return (
    <NavigationContainer style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerTitle: "",
          headerBackTitle: "",
          headerTransparent: true,
          headerTintColor: `${ColorSet.navyColor(100)}`,
        }}
      >
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <LoginScreen startScreenChange={startScreenChange} />}
        </Stack.Screen>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Kakao" component={KakaloLoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
  position: relative;
  top: ${(props) => props.windowHeight * 0.28}%;
  width: 100%;
`
