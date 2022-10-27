import * as React from "react"
import { BottomNavigation, Text } from "react-native-paper"
import { View, StyleSheet } from "react-native"

import StartScreen from "./screens/StartScreen"
import MyCGScreen from "./screens/MyCGScreen"
import RankingCGScreen from "./screens/RankingCGScreen"
import UserRankScreen from "./screens/UserRankScreen"
import MyPageScreen from "./screens/MyPageScreen"

import ColorSet from "./style/ColorSet"

const MyCGRoute = () => <MyCGScreen />

const RankingCGRoute = () => <RankingCGScreen />

const UserRankRoute = () => <UserRankScreen />

const MyPageRoute = () => <MyPageScreen />

const MyComponent = () => {
  const [index, setIndex] = React.useState(4)
  const [routes] = React.useState([
    {
      key: "myCG",
      title: "내 챌린지",
      focusedIcon: "home",
    },
    { key: "rankingCG", title: "랭킹 챌린지", focusedIcon: "fire" },
    { key: "userRank", title: "유저랭킹", focusedIcon: "crown" },
    {
      key: "myPage",
      title: "마이페이지",
      focusedIcon: "account",
    },
  ])

  const renderScene = BottomNavigation.SceneMap({
    myCG: MyCGRoute,
    rankingCG: RankingCGRoute,
    userRank: UserRankRoute,
    myPage: MyPageRoute,
  })

  function startScreenChange() {
    setIndex(0)
  }
  // index == 4인 경우 StartScreen 출력, 그 외엔 BottomNav랑 해당 스크린 출력
  return (
    <View style={styles.rootScreen}>
      {index == 4 ? (
        <StartScreen startScreenChange={startScreenChange} />
      ) : (
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          compact={false}
          sceneAnimationType={"shifting"}
          barStyle={styles.bottomNavContainer}
          activeColor={`${ColorSet.orangeColor(100)}`}
          inactiveColor={`${ColorSet.navyColor(100)}`}
          theme={{
            colors: {
              onSurfaceVariant: `${ColorSet.navyColor(100)}`,
              onSurface: `${ColorSet.orangeColor(100)}`,
              secondaryContainer: "#FF999900",
            },
          }}
        />
      )}
    </View>
  )
}

export default MyComponent

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  bottomNavContainer: {
    backgroundColor: "white",
    borderTopColor: `${ColorSet.navyColor(100)}`,
    borderTopWidth: 1,
  },
})
