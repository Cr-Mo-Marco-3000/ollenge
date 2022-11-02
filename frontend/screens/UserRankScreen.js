import React from "react"
import RankList from "../components/UserRankScreen/RankList"
import ShowUserBadge from "../components/UserRankScreen/ShowUserBadge"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ColorSet from "../style/ColorSet"

const Stack = createNativeStackNavigator()

function UserRankScreen() {
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
        <Stack.Screen name="RankList" options={{ headerShown: false }} component={RankList} />
        <Stack.Screen name="UserBadge" component={ShowUserBadge} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default UserRankScreen
