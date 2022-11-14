import React, { useState } from "react"

import { createStackNavigator } from "@react-navigation/stack"
import { Page1, Page2, Page3, Page4 } from "../components/CreateCGScreen/index"
import { Page5, Page6, Page7, Final } from "../components/CreateCGScreen/index"
import { useNavigation } from "@react-navigation/native"
import ColorSet from "../style/ColorSet"
import { StyleSheet } from "react-native"
import { fontStyles } from "../components/CreateCGScreen/PageBase"

const Stack = createStackNavigator()
const initialData = {
  challengeImg: "",
  challengeName: "",
  challengeTopic: "정해진 토픽",
  authType: "none",
  startDate: "2022-11-29",
  endDate: "2022-11-30",
  startTime: "11:00:00",
  endTime: "12:00:00",
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
      <Stack.Screen name="Page1" options={{ title: "팀 정보 설정" }}>
        {() => (
          <Page1
            info={info}
            setInfo={setInfo}
            toNext={isRank ? "Page4" : "Page2"}
            cancelAll={goBack}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Page2" options={{ title: "팀 목표 설정" }}>
        {() => <Page2 info={info} setInfo={setInfo} toNext={"Page3"} cancelAll={goBack} />}
      </Stack.Screen>
      <Stack.Screen name="Page3" options={{ title: "목표 인증 방법" }}>
        {() => <Page3 info={info} setInfo={setInfo} toNext={"Page4"} cancelAll={goBack} />}
      </Stack.Screen>
      <Stack.Screen name="Page4" options={{ title: "팀 설명 입력" }}>
        {() => (
          <Page4
            info={info}
            setInfo={setInfo}
            toNext={isRank ? "Page7" : "Page5"}
            cancelAll={goBack}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Page5" options={{ title: "챌린지 기간 설정" }}>
        {() => <Page5 info={info} setInfo={setInfo} toNext={"Page6"} cancelAll={goBack} />}
      </Stack.Screen>
      <Stack.Screen name="Page6" options={{ title: "인증 시간 설정" }}>
        {() => <Page6 info={info} setInfo={setInfo} toNext={"Page7"} cancelAll={goBack} />}
      </Stack.Screen>
      <Stack.Screen name="Page7" options={{ title: "보상/벌칙 설정" }}>
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
    headerTransparent: true,
    headerBackTitle: "",
    headerTintColor: `${ColorSet.navyColor(1)}`,
    headerTitleStyle: {
      ...fontStyles.HyeminBold({ size: 7.5, color: `${ColorSet.navyColor(1)}` }),
    },
    headerTitleAlign: "center",
    backgroundColor: "black",
  },
})
