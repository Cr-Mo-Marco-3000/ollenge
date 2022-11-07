import React from "react"

import styled from "styled-components"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

import TopMargin from "../../common/TopMargin"

import ColorSet from "../../../style/ColorSet"

import UserRanking from "./UserRanking"
import UserStatus from "./UserStatus"

function CGUserScreen() {
  const Tab = createMaterialTopTabNavigator()
  return (
    <Body>
      <TopMargin />
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
        <Tab.Screen name="참여자 순위">{(props) => <UserRanking />}</Tab.Screen>
        <Tab.Screen name="인증 현황">{(props) => <UserStatus />}</Tab.Screen>
      </Tab.Navigator>
    </Body>
  )
}
export default CGUserScreen

const Body = styled.View`
  flex: 1;
  background-color: white;
  width: 100%;
  padding-top: 12%;
`
