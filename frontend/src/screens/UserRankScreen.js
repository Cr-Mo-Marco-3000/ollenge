import React from "react"
import RankList from "../components/UserRankScreen/RankList"
import ShowUserBadge from "../components/UserRankScreen/ShowUserBadge"

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ColorSet from "../style/ColorSet"

const Stack = createNativeStackNavigator()

function UserRankScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "",
        headerBackTitle: "",
        headerTransparent: true,
        headerTintColor: `${ColorSet.navyColor(100)}`,
      }}
      initialRouteName="RankList"
    >
      <Stack.Screen name="RankList" options={{ headerShown: false }} component={RankList} />
      <Stack.Screen name="UserBadge" component={ShowUserBadge} />
    </Stack.Navigator>
  )
}
export default UserRankScreen
