import React, { useEffect, useState } from "react"
import RankList from "../components/UserRankScreen/RankList"
import ShowUserBadge from "../components/UserRankScreen/ShowUserBadge"

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ColorSet from "../style/ColorSet"
import { Text, View } from "react-native"

import PageBase from "../components/UserRankScreen/PageBase"
import { AuthorizationInstance } from "../api/settings"
import { useNavigation } from "@react-navigation/native"

export const setScore = (score) => {
  const val = score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return val
}

const Stack = createNativeStackNavigator()

const UserRankScreen = () => {
  const [data, setData] = useState({})
  const [status, setStatus] = useState("pending")
  const navigation = useNavigation()

  const getInfo = async () => {
    const instance = AuthorizationInstance()
    await instance.get("/api/user/ranking").then((res) => {
      setData(res.data)
      console.log(res.data)
      setStatus("idle")
    })
  }

  useEffect(() => {
    const focusEvent = navigation.addListener("focus", () => {
      const reload = async () => {
        setStatus("pending")
        const instance = AuthorizationInstance()
        await instance.get("/api/user/ranking").then((res) => {
          setData(res.data)
          setStatus("idle")
        })
      }
      reload()
    })
    return focusEvent
  }, [navigation])

  return (
    <>
      {status === "pending" && (
        <PageBase>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>로딩 중...</Text>
          </View>
        </PageBase>
      )}
      {status === "idle" && (
        <View style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={styles.screenStyle} initialRouteName="RankList">
            <Stack.Screen name="RankList" options={{ headerShown: false }}>
              {() => <RankList rankInfo={data} />}
            </Stack.Screen>
            <Stack.Screen name="UserBadge" component={ShowUserBadge} />
          </Stack.Navigator>
        </View>
      )}
    </>
  )
}
export default UserRankScreen
const styles = {
  screenStyle: {
    headerTitle: "",
    headerBackTitle: "",
    headerTransparent: true,
    headerTintColor: `${ColorSet.navyColor(100)}`,
  },
}
