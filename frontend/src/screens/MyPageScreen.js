import React, { useContext } from "react"

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import MyInfoScreen from "../components/MyPageScreen/MyInfoScreen"
import MyInfoEditScreen from "../components/MyPageScreen/MyInfoEditScreen"
import { AuthContext } from "../../store/auth-context"

import ColorSet from "../style/ColorSet"

const Stack = createNativeStackNavigator()

function MyPageScreen() {
  const authCtx = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "",
        headerBackTitle: "",
        headerTransparent: true,
        headerTintColor: `${ColorSet.navyColor(100)}`,
      }}
    >
      <Stack.Screen name="MyInfo" options={{ headerShown: false }}>
        {() => <MyInfoScreen userInfo={authCtx.userInfo} />}
      </Stack.Screen>
      <Stack.Screen name="EditInfo">
        {() => <MyInfoEditScreen userInfo={authCtx.userInfo} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
export default MyPageScreen
