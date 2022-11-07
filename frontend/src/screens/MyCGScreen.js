import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import MyCGListScreen from "./MyCGListScreen"
import CGRoomScreen from "./CGRoomScreen"
import ColorSet from "../style/ColorSet"

const Stack = createNativeStackNavigator()

function MyCGScreen() {
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
        <Stack.Screen name="CGList" options={{ headerShown: false }} component={MyCGListScreen} />
        <Stack.Screen name="CGRoom" component={CGRoomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default MyCGScreen
