import React, { useState } from "react"

import { createStackNavigator } from "@react-navigation/stack"
import { Page1, Page2, Page3, Page4 } from "../components/CreateCGScreen/index"
import { Page5, Page6, Page7, Final } from "../components/CreateCGScreen/index"
import { useNavigation } from "@react-navigation/native"

import { StyleSheet } from "react-native"
import ColorSet from "../style/ColorSet"
const Stack = createStackNavigator()
const initialData = {
  challengeImg: "",
  challengeName: "",
  challengeTopic: "",
  authType: "none",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  rewardContent: "",
  penaltyContent: "",
  challengeDescription: "",
}

/**
 * Challenge Room을 생성하는 컴포넌트입니다.
 * @param {boolean} isRank -
 * - isRank = true: Ranking 챌린지 * - isRank = fasle: 일반 챌린지
 */
export default function CreateCGScreen({ isRank = false, CGInfo = initialData }) {
  const [info, setInfo] = useState({ ...CGInfo })
  const navigation = useNavigation()
  const goBack = () => {
    navigation.goBack()
  }
  return (
    <Stack.Navigator screenOptions={styles.screenOptions}>
      <Stack.Screen name="Page1" options={{ title: "" }}>
        {() => (
          <Page1
            info={info}
            setInfo={setInfo}
            toNext={isRank ? "Page4" : "Page2"}
            cancelAll={goBack}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Page2" options={{ title: "" }}>
        {() => <Page2 info={info} setInfo={setInfo} toNext={"Page3"} cancelAll={goBack} />}
      </Stack.Screen>
      <Stack.Screen name="Page3" options={{ title: "" }}>
        {() => <Page3 info={info} setInfo={setInfo} toNext={"Page4"} cancelAll={goBack} />}
      </Stack.Screen>
      <Stack.Screen name="Page4" options={{ title: "" }}>
        {() => (
          <Page4
            info={info}
            setInfo={setInfo}
            toNext={isRank ? "Page7" : "Page5"}
            cancelAll={goBack}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Page5" options={{ title: "" }}>
        {() => <Page5 info={info} setInfo={setInfo} toNext={"Page6"} cancelAll={goBack} />}
      </Stack.Screen>
      <Stack.Screen name="Page6" options={{ title: "" }}>
        {() => <Page6 info={info} setInfo={setInfo} toNext={"Page7"} cancelAll={goBack} />}
      </Stack.Screen>
      <Stack.Screen name="Page7" options={{ title: "" }}>
        {() => <Page7 info={info} setInfo={setInfo} toNext={"Final"} cancelAll={goBack} />}
      </Stack.Screen>
      <Stack.Screen name="Final" options={{ title: "🍊" }}>
        {() => (
          <Final
            info={info}
            setInfo={setInfo}
            toNext={"Submit"}
            isRank={isRank}
            cancelAll={goBack}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  screenOptions: {
    headerBackTitle: "",
    headerTransparent: true,
    headerTintColor: `${ColorSet.navyColor(100)}`,
    headerTitleAlign: "center",
    headerTitleStyle: { fontFamily: "HyeminBold" },
  },
})
