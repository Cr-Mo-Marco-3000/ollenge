import * as React from "react"
import { BottomNavigation } from "react-native-paper"
import { StyleSheet } from "react-native"
import * as Font from "expo-font"
import AppLoading from "expo-app-loading"
import { useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

import StartScreen from "./src/screens/StartScreen"
import MyCGScreen from "./src/screens/MyCGScreen"
import RankingCGScreen from "./src/screens/RankingCGScreen"
import UserRankScreen from "./src/screens/UserRankScreen"
import MyPageScreen from "./src/screens/MyPageScreen"
import CreateCGScreen from "./src/screens/CreateCGScreen"

import ColorSet from "./src/style/ColorSet"
import AuthContextProvider, { AuthContext } from "./store/auth-context"

const MyCGRoute = () => <MyCGScreen />

const RankingCGRoute = () => <RankingCGScreen />

const UserRankRoute = () => <UserRankScreen />

const MyPageRoute = () => <MyPageScreen />

const CreateCGRoute = () => <CreateCGScreen />

function AuthStack() {
  return <StartScreen />
}

function AuthenticatedStack() {
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
    { key: "createCG", title: "챌린지 생성", focusedIcon: "crown" },
  ])

  const renderScene = BottomNavigation.SceneMap({
    myCG: MyCGRoute,
    rankingCG: RankingCGRoute,
    userRank: UserRankRoute,
    myPage: MyPageRoute,
    createCG: CreateCGRoute,
  })

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      compact={false}
      sceneAnimationType={"shifting"}
      barStyle={styles.bottomNavContainer}
      activeColor={`${ColorSet.orangeColor(1)}`}
      inactiveColor={`${ColorSet.navyColor(1)}`}
      theme={{
        fonts: {
          labelMedium: {
            fontFamily: "HyeminBold",
          },
        },
        colors: {
          onSurfaceVariant: `${ColorSet.navyColor(1)}`,
          onSurface: `${ColorSet.orangeColor(1)}`,
          secondaryContainer: "#FF999900",
        },
      }}
    />
  )
}

function Navigation() {
  const authCtx = useContext(AuthContext)
  return <>{authCtx.token && authCtx.isSigned ? <AuthenticatedStack /> : <AuthStack />}</>
}

function Root() {
  const [isTryingLogin, setTryingLogin] = useState(true)
  const authCtx = useContext(AuthContext)
  async function fetchToken() {
    const storedToken = await AsyncStorage.getItem("token")
    if (storedToken) {
      authCtx.authenticate(storedToken)
    }
  }

  async function fetchSigned() {
    const storedUserFlag = await AsyncStorage.getItem("userFlag")
    if (storedUserFlag) {
      authCtx.signed(storedUserFlag)
    }
  }

  const getFonts = async () => {
    await Font.loadAsync({
      Recipekorea: require("./src/assets/fonts/Recipekorea.ttf"),
      HyeminRegular: require("./src/assets/fonts/HyeminRegular.ttf"),
      HyeminBold: require("./src/assets/fonts/HyeminBold.ttf"),
    })
    setTryingLogin(false)
  }
  useEffect(() => {
    fetchToken()
    fetchSigned()
    getFonts()
  }, [])

  if (isTryingLogin) {
    return <AppLoading />
  }
  return <Navigation />
}

function App() {
  return (
    <>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  bottomNavContainer: {
    backgroundColor: "white",
    borderTopColor: `${ColorSet.navyColor(1)}`,
    borderTopWidth: 1,
  },
})
