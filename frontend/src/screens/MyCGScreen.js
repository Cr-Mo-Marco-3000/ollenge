import React, { useContext } from "react"

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import MyCGListScreen from "./MyCGListScreen"
import CGRoomScreen from "./CGRoomScreen"
import CGUserScreen from "../components/CGRoomScreen/CGUserScreen/CGUserScreen"
import AuthScreen from "../components/AuthScreen/AuthScreen"
import ResistScreen from "../components/RistisScreen/ResistScreen"
import { RoomContext } from "../../store/room-context"
import CreateCGScreen from "../screens/CreateCGScreen"
import ColorSet from "../style/ColorSet"

const Stack = createNativeStackNavigator()

function MyCGScreen() {
  const roomCtx = useContext(RoomContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: "",
        headerTransparent: true,
        headerTintColor: `${ColorSet.navyColor(100)}`,
        headerTitleAlign: "center",
        headerTitleStyle: { fontFamily: "HyeminBold" },
      }}
    >
      <Stack.Screen name="CGList" options={{ headerShown: false }} component={MyCGListScreen} />
      <Stack.Screen
        name="CGRoom"
        options={{ title: `${roomCtx.roomInfo.challengeName}` }}
        component={CGRoomScreen}
      />

      <Stack.Screen name="CGUser" options={{ title: "" }} component={CGUserScreen} />
      <Stack.Screen name="CGAuth" component={AuthScreen} options={{ title: "오늘 챌린지 인증" }} />
      <Stack.Screen name="CGImg" component={ResistScreen} options={{ title: "인증 이미지 입력" }} />
      <Stack.Screen name="CGCreate" options={{ title: "", headerShown: false }}>
        {() => <CreateCGScreen isRank={false} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
export default MyCGScreen
