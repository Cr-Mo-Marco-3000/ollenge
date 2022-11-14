import React, { useEffect, useState } from "react"
import RankList from "../components/UserRankScreen/RankList"
import ShowUserBadge from "../components/UserRankScreen/ShowUserBadge"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ColorSet from "../style/ColorSet"
import { Text, View } from "react-native"
import userAPI from "../api/user/user"
import PageBase from "../components/UserRankScreen/PageBase"
import { AuthorizationInstance } from "../api/settings"

const Stack = createNativeStackNavigator()

function UserRankScreen() {
  const [data, setData] = useState({})
  const [status, setStatus] = useState("pending")

  const getInfo = async () => {
    const instance = AuthorizationInstance()
    await instance.get("/api/user/ranking").then((res) => {
      setData(res.data)
      setStatus("idle")
    })
  }

  useEffect(() => {
    if (status === "pending") {
      getInfo()
    }
  }, [])

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
        <NavigationContainer style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={styles.screenStyle} initialRouteName="RankList">
            <Stack.Screen name="RankList" options={{ headerShown: false }}>
              {() => <RankList rankInfo={data} />}
            </Stack.Screen>
            <Stack.Screen name="UserBadge" component={ShowUserBadge} />
          </Stack.Navigator>
        </NavigationContainer>
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
