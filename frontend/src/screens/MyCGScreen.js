import React, { useContext } from "react"

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import MyCGListScreen from "./MyCGListScreen"
import CGRoomScreen from "./CGRoomScreen"
import CGUserScreen from "../components/CGRoomScreen/CGUserScreen/CGUserScreen"
import AuthScreen from "../components/CGRoomScreen/AuthScreen"
import ImageRegisterPage from "../components/CGRoomScreen/ImageRegisterScreen"
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
        headerShown: false,
      }}
    >
      <Stack.Screen name="CGList" options={{ headerShown: false }}>
        {() => <MyCGListScreen />}
      </Stack.Screen>
      <Stack.Screen name="CGRoom" options={{ title: `${roomCtx.roomInfo.challengeName}` }}>
        {() => <CGRoomScreen />}
      </Stack.Screen>

      <Stack.Screen name="CGUser" options={{ title: "" }}>
        {() => <CGUserScreen />}
      </Stack.Screen>
      <Stack.Screen name="CGAuth" component={AuthScreen} options={{ title: "" }} />
      <Stack.Screen name="CGImg" component={ImageRegisterPage} options={{ title: "" }} />
      <Stack.Screen name="CGCreate" options={{ title: "" }}>
        {() => <CreateCGScreen isRank={false} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
export default MyCGScreen
