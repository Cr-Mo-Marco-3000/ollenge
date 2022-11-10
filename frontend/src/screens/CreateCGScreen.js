import React, { useState } from "react"

import { createStackNavigator } from "@react-navigation/stack"
import { Page1, Page2, Page3, Page4 } from "../components/CreateCGScreen/index"
import { Page5, Page6, Page7, Final } from "../components/CreateCGScreen/index"
import { NavigationContainer } from "@react-navigation/native"
import ColorSet from "../style/ColorSet"

const Stack = createStackNavigator()
const initialData = {
  challengeImg: "",
  challengeName: "그룹명 초기값",
  challengeTopic: "주제 초기값",
  authType: "none",
  startDate: "2022-11-29",
  endDate: "2022-11-30",
  startTime: "03:14:00",
  endTime: "19:14:00",
  rewardContent: "",
  penaltyContent: "",
  challengeDescription: "챌린지 설명 초기값",
}

export default function CreateCGScreen() {
  const [info, setInfo] = useState(initialData)

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: `${ColorSet.paleBlueColor(1)}` },
        headerTitleStyle: { fontSize: 24 },
      }}
    >
      <Stack.Screen name="Page1" options={{ title: "팀 정보 설정" }}>
        {() => <Page1 info={info} setInfo={setInfo} />}
      </Stack.Screen>
      <Stack.Screen name="Page2" options={{ title: "팀 목표 설정" }}>
        {() => <Page2 info={info} setInfo={setInfo} />}
      </Stack.Screen>
      <Stack.Screen name="Page3" options={{ title: "목표 인증 방법" }}>
        {() => <Page3 info={info} setInfo={setInfo} />}
      </Stack.Screen>
      <Stack.Screen name="Page4" options={{ title: "팀 설명 입력" }}>
        {() => <Page4 info={info} setInfo={setInfo} />}
      </Stack.Screen>
      <Stack.Screen name="Page5" options={{ title: "챌린지 기간 설정" }}>
        {() => <Page5 info={info} setInfo={setInfo} />}
      </Stack.Screen>
      <Stack.Screen name="Page6" options={{ title: "인증 시간 설정" }}>
        {() => <Page6 info={info} setInfo={setInfo} />}
      </Stack.Screen>
      <Stack.Screen name="Page7" options={{ title: "보상/벌칙 설정" }}>
        {() => <Page7 info={info} setInfo={setInfo} />}
      </Stack.Screen>
      <Stack.Screen name="Final" options={{ title: "" }}>
        {() => <Final info={info} setInfo={setInfo} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
