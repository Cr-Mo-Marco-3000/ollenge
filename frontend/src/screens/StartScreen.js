import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LoginScreen from "../components/StartScreen/LoginScreen"
import SignupScreen from "../components/StartScreen/SignupScreen"

const Stack = createNativeStackNavigator()

function StartScreen({ startScreenChange }) {
  return (
    <NavigationContainer style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login">
          {(props) => <LoginScreen startScreenChange={startScreenChange} />}
        </Stack.Screen>
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default StartScreen
