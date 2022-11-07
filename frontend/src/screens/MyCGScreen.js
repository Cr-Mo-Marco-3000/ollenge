import React, { useEffect, useState } from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import MyCGListScreen from "./MyCGListScreen"
import CGRoomScreen from "./CGRoomScreen"
import CGUserScreen from "../components/CGRoomScreen.js/CGUserScreen"
import AuthScreen from "../components/CGRoomScreen.js/AuthScreen"
import ImageRegisterPage from "../components/CGRoomScreen.js/ImageRegisterScreen"

import ColorSet from "../style/ColorSet"

import { AuthorizationInstance } from "../api/settings"

const Stack = createNativeStackNavigator()

const instance = AuthorizationInstance()

function MyCGScreen() {
  const [selectedId, setSelectedId] = useState(-1)
  const [roomInfo, setRoomInfo] = useState({})

  function idHandler(id) {
    setSelectedId(id)
  }

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await instance.get(`/api/challenge/${selectedId}`)
        const newInfo = res.data
        setRoomInfo(newInfo)
      } catch (error) {
        // console.log(error)
      }
    }
    if (selectedId !== -1) {
      getRoom()
    }
  }, [selectedId])

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
        <Stack.Screen name="CGList" options={{ headerShown: false }}>
          {(props) => <MyCGListScreen idHandler={idHandler} />}
        </Stack.Screen>
        <Stack.Screen name="CGRoom">{(props) => <CGRoomScreen roomInfo={roomInfo} />}</Stack.Screen>

        <Stack.Screen name="CGUser" component={CGUserScreen} />
        <Stack.Screen name="CGAuth" component={AuthScreen} />
        <Stack.Screen name="CGImg" component={ImageRegisterPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default MyCGScreen
