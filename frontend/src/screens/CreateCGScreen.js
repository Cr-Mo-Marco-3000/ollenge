import React, { useState } from "react"

import { createStackNavigator } from "@react-navigation/stack"
import { Page1, Page2, Page3, Page4 } from "../components/CreateCGScreen/index"
import { NavigationContainer } from "@react-navigation/native"

const Stack = createStackNavigator()
const initialData = {
  userId: 1514,
  challengePresetId: 1514,
  challengeImg: "https://5.imimg.com/data5/YK/MJ/MY-44646927/oranges-500x500.jpg",
  challengeName: "그룹명 초기값",
  challengeTopic: "주제 초기값",
  authType: "인증 방식 초기값",
  startDate: "1995-03-14",
  endDate: "1996-03-14",
  startTime: "03:14",
  endTime: "15:14",
  rewardContent: "보상 초기값",
  penaltyContent: "패널티 초기값",
  challengeDescription: "챌린지 설명 초기값",
}

export default function CreateCGScreen() {
  const [info, setInfo] = useState(initialData)

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerTitleStyle: { display: "none" }, headerShown: false }}
      >
        <Stack.Screen name="Page1">{() => <Page1 info={info} setInfo={setInfo} />}</Stack.Screen>
        <Stack.Screen name="Page2">{() => <Page1 info={info} setInfo={setInfo} />}</Stack.Screen>
        <Stack.Screen name="Page3" component={Page3} />
        <Stack.Screen name="Page4" component={Page4} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
