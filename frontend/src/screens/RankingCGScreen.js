import React, { useState } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RoomContext } from "../../store/room-context"
import RankingCGListScreen from "./RankingCGListScreen"
import CreateCGScreen from "./CreateCGScreen"
import ColorSet from "../style/ColorSet"
import { useNavigation } from "@react-navigation/native"
const Stack = createNativeStackNavigator()

const RankingCGScreen = () => {
  const [selectedCGInfo, setSelectedCGInfo] = useState({})

  const navigation = useNavigation()

  const makeChallenge = async (info) => {
    const newInfo = {
      ...info,
    }
    setSelectedCGInfo(newInfo)
    navigation.navigate("CGCreate")
  }
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
      <Stack.Screen name="RankingCGListScreen">
        {() => <RankingCGListScreen makeChallenge={makeChallenge} />}
      </Stack.Screen>
      <Stack.Screen name="CGCreate" options={{ title: "" }}>
        {() => <CreateCGScreen isRank={true} CGInfo={selectedCGInfo} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default RankingCGScreen
