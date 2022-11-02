import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import MyInfoScreen from "../components/MyPageScreen/MyInfoScreen"
import MyInfoEditScreen from "../components/MyPageScreen/MyInfoEditScreen"

import ColorSet from "../style/ColorSet"

const Stack = createNativeStackNavigator()

function MyPageScreen() {
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
        <Stack.Screen name="MyInfo" options={{ headerShown: false }} component={MyInfoScreen} />
        <Stack.Screen name="EditInfo" component={MyInfoEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default MyPageScreen
