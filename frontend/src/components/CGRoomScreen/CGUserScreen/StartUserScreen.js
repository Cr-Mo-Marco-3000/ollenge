import React from "react"

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

import ColorSet from "../../../style/ColorSet"
import UserRanking from "./UserRanking"
import UserStatus from "./UserStatus"

function StartUserScreen({ userList }) {
  const Tab = createMaterialTopTabNavigator()
  return (
    <Tab.Navigator
      style={{
        flex: 8,
      }}
      screenOptions={{
        tabBarLabelStyle: { fontSize: 16, fontFamily: "HyeminBold" },
        tabBarActiveTintColor: `${ColorSet.orangeColor(1)}`,
        tabBarInactiveTintColor: `${ColorSet.navyColor(0.5)}`,
        tabBarIndicatorStyle: {
          backgroundColor: `${ColorSet.orangeColor(1)}`,
        },
      }}
    >
      <Tab.Screen name="참여자 순위">{() => <UserRanking userList={userList} />}</Tab.Screen>
      <Tab.Screen name="인증 현황">{() => <UserStatus userList={userList} />}</Tab.Screen>
    </Tab.Navigator>
  )
}
export default StartUserScreen
