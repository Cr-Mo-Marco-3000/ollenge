import React, { useContext } from "react"

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import MyInfoScreen from "../components/MyPageScreen/MyInfoScreen"
import MyInfoEditScreen from "../components/MyPageScreen/MyInfoEditScreen"
import { AuthContext } from "../../store/auth-context"

import ColorSet from "../style/ColorSet"

const Stack = createNativeStackNavigator()

function MyPageScreen() {
  const authCtx = useContext(AuthContext)
  // const userId = authCtx.userInfo.userId
  const userId = 1

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
        {(props) => <MyInfoScreen userInfo={authCtx.userInfo} />}
      </Stack.Screen>
      <Stack.Screen name="EditInfo">
        {(props) => <MyInfoEditScreen userInfo={authCtx.userInfo} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
export default MyPageScreen
