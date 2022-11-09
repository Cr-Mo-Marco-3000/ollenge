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
  const [roomInfo, setRoomInfo] = useState(new Object())
  const [userList, setUserList] = useState(new Array())

  function idHandler(id) {
    setSelectedId(id)
  }

  // 방 정보 조회
  const getRoom = async () => {
    try {
      const res = await instance.get(`/api/challenge/${selectedId}`)
      const newInfo = res.data.challengeInfoList
      setRoomInfo(newInfo)
    } catch (error) {
      // console.log(error)
    }
  }

  // 방 유저 정보 조회
  async function getUser() {
    console.log(`/api/challenge/state/${selectedId}`)
    instance
      .get(`/api/challenge/state/${selectedId}`)
      .then((res) => {
        setUserList(res.data.challengeStateList)
        console.log(res.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (selectedId !== -1) {
      getRoom()
      getUser()
    }
  }, [selectedId])

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
          {() => <CGRoomScreen roomInfo={roomInfo} userList={userList} />}
        </Stack.Screen>

        <Stack.Screen name="CGUser" options={{ title: "" }}>
          {() => <CGUserScreen userList={userList} roomInfo={roomInfo} />}
        </Stack.Screen>
        <Stack.Screen name="CGAuth" component={AuthScreen} options={{ title: "" }} />
        <Stack.Screen name="CGImg" component={ImageRegisterPage} options={{ title: "" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default MyCGScreen
