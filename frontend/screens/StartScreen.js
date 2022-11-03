// import { Text } from "react-native-paper";
import React from "react"

import { StyleSheet } from "react-native"
import styled from "styled-components/native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ColorSet from "../style/ColorSet"
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
          headerTintColor: `${ColorSet.navyColor(1)}`,
          headerStyle: {
            backgroundColor: `${ColorSet.blackColor(0)}`,
          },
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
