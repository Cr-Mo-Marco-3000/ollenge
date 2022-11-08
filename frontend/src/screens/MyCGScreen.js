import React, { useEffect, useState } from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import MyCGListScreen from "./MyCGListScreen"
import CGRoomScreen from "./CGRoomScreen"
import CGUserScreen from "../components/CGRoomScreen/CGUserScreen/CGUserScreen"
import AuthScreen from "../components/CGRoomScreen/AuthScreen"
import ImageRegisterPage from "../components/CGRoomScreen/ImageRegisterScreen"

import ColorSet from "../style/ColorSet"

import { AuthorizationInstance } from "../api/settings"

const Stack = createNativeStackNavigator()

const instance = AuthorizationInstance()

function MyCGScreen() {
  const [selectedId, setSelectedId] = useState(-1)
  // const [roomInfo, setRoomInfo] = useState({})

  function idHandler(id) {
    setSelectedId(id)
  }

  // useEffect(() => {
  //   const getRoom = async () => {
  //     try {
  //       const res = await instance.get(`/api/challenge/${selectedId}`)
  //       const newInfo = res.data.challengeInfoList[0]
  //       setRoomInfo(newInfo)
  //     } catch (error) {
  //       // console.log(error)
  //     }
  //   }
  //   if (selectedId !== -1) {
  //     getRoom()
  //   }
  // }, [selectedId])

  const roomInfo = {
    challengeId: 1,
    isRankingChallenge: 0,
    challengeImg: "",
    challengeName: "찬호와 아이들",
    challengeTopic: "프로젝트 끝까지 1일 1커밋",
    authType: "사진 비교",
    startDate: "2022-11-06",
    endDate: "2022-11-30",
    startTime: "09:40:00",
    endTime: "20:20:00",
    inviteCode: "R92DFG21",
    rewardContent: "상금",
    penaltyContent: "엉덩이로 이름쓰기",
    challengeScore: 3400,
    challengeDescription: "저는 더이상 살아갈 수 없어요",
  }

  return (
    <NavigationContainer style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerBackTitle: "",
          headerTransparent: true,
          headerTintColor: `${ColorSet.navyColor(100)}`,
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "HyeminBold" },
        }}
      >
        <Stack.Screen name="CGList" options={{ headerShown: false }}>
          {() => <MyCGListScreen idHandler={idHandler} />}
        </Stack.Screen>
        <Stack.Screen name="CGRoom" options={{ title: `${roomInfo.challengeName}` }}>
          {() => <CGRoomScreen roomInfo={roomInfo} />}
        </Stack.Screen>

        <Stack.Screen name="CGUser" component={CGUserScreen} />
        <Stack.Screen name="CGAuth" component={AuthScreen} />
        <Stack.Screen name="CGImg" component={ImageRegisterPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default MyCGScreen
