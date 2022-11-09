import React, { useState } from "react"

import { createStackNavigator } from "@react-navigation/stack"
import { Page1, Page2, Page3, Page4 } from "../components/CreateCGScreen/index"
import { Page5, Page6, Page7, Final, CustomTopicInput } from "../components/CreateCGScreen/index"
import { NavigationContainer } from "@react-navigation/native"
import ColorSet from "../style/ColorSet"
import { fontStyles } from "../components/CreateCGScreen/PageBase"

const Stack = createStackNavigator()
const initialData = {
  challengeName: "TEST NAME",
  challengeTopic: "TEST TOPIC",
  authType: "feature",
  startDate: "2022-11-13",
  endDate: "2022-12-11",
  startTime: "15:00:00",
  endTime: "16:00:00",
  rewardContent: "",
  penaltyContent: "",
  challengeDescription: "",
}
// bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaXNzIjoib2xsZW5nZS5jb20iLCJleHAiOjE2Njg2NDYwNzEsImlhdCI6MTY2NzM1MDA3MX0.RzAQkJst9HCND7a_sdZ_8POhjIJmJZE2TsJcvq3Iuj7CcE4ouQW6WN5DJ1RApYoGaowPGl2Dimk4fyOFxju1jQ

export default function CreateCGScreen() {
  const [info, setInfo] = useState(initialData)

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerBackTitle: "",
          headerTintColor: `${ColorSet.navyColor(1)}`,
          headerTitleStyle: {
            ...fontStyles.HyeminBold({ size: 7.5, color: `${ColorSet.navyColor(1)}` }),
          },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="Final" options={{ title: "🍊" }}>
          {() => <Final info={info} setInfo={setInfo} />}
        </Stack.Screen>
        <Stack.Screen name="Page1" options={{ title: "팀 정보 설정" }}>
          {() => <Page1 info={info} setInfo={setInfo} />}
        </Stack.Screen>
        <Stack.Screen name="Page2" options={{ title: "오랭지 목표" }}>
          {() => <Page2 info={info} setInfo={setInfo} />}
        </Stack.Screen>
        <Stack.Screen name="CustomTopic" options={{ title: "목표 입력" }}>
          {() => <CustomTopicInput info={info} setInfo={setInfo} />}
        </Stack.Screen>
        <Stack.Screen name="Page3" options={{ title: "목표 인증 방법" }}>
          {() => <Page3 info={info} setInfo={setInfo} />}
        </Stack.Screen>
        <Stack.Screen name="Page4" options={{ title: "챌린지 설명" }}>
          {() => <Page4 info={info} setInfo={setInfo} />}
        </Stack.Screen>
        <Stack.Screen name="Page5" options={{ title: "기간 설정" }}>
          {() => <Page5 info={info} setInfo={setInfo} />}
        </Stack.Screen>
        <Stack.Screen name="Page6" options={{ title: "인증 시간 설정" }}>
          {() => <Page6 info={info} setInfo={setInfo} />}
        </Stack.Screen>
        <Stack.Screen name="Page7" options={{ title: "보상/벌칙 설정" }}>
          {() => <Page7 info={info} setInfo={setInfo} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
