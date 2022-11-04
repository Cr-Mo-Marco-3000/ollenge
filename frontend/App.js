import * as React from "react"
import { BottomNavigation } from "react-native-paper"
import { View, StyleSheet } from "react-native"
import * as Font from "expo-font"
import AppLoading from "expo-app-loading"
import { useState, useContext, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"

import StartScreen from "./src/screens/StartScreen"
import MyCGScreen from "./src/screens/MyCGScreen"
import RankingCGScreen from "./src/screens/RankingCGScreen"
import UserRankScreen from "./src/screens/UserRankScreen"
import MyPageScreen from "./src/screens/MyPageScreen"
import CreateCGScreen from "./src/screens/CreateCGScreen"
import LoginScreen from "./src/components/StartScreen/LoginScreen"
import SignupScreen from "./src/components/StartScreen/SignupScreen"

import ColorSet from "./src/style/ColorSet"
import AuthContextProvider, { AuthContext } from "./store/auth-context"
import AsyncStorage from "@react-native-async-storage/async-storage"

const MyCGRoute = () => <MyCGScreen />

const RankingCGRoute = () => <RankingCGScreen />

const UserRankRoute = () => <UserRankScreen />

const MyPageRoute = () => <MyPageScreen />

const CreateCGRoute = () => <CreateCGScreen />

function AuthStack() {
  const authCtx = useContext(AuthContext)
  console.log("000", authCtx.token)
  return <StartScreen />
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext)
  console.log("111", authCtx.token)
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
  const [authFlag, setAuthFlag] = useState(false)
  useEffect(() => {
    if (authCtx.isAuthenticated && authCtx.isSigned) {
      setAuthFlag(true)
    }
  }, [authCtx])
  return (
    <>
      {!authFlag && <AuthStack />}
      {authFlag && <AuthenticatedStack />}
    </>
  )
}

function Root() {
  const [isTryingLogin, setTryingLogin] = useState(true)
  const authCtx = useContext(AuthContext)
  async function fetchToken() {
    const storedToken = await AsyncStorage.getItem("token")
    const storedUserFlag = await AsyncStorage.getItem("userFlag")

    if (storedToken) {
      authCtx.authenticate(storedToken)
    }
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

// const MyCGRoute = () => <MyCGScreen />

// const RankingCGRoute = () => <RankingCGScreen />

// const UserRankRoute = () => <UserRankScreen />

// const MyPageRoute = () => <MyPageScreen />

// const CreateCGRoute = () => <CreateCGScreen />

// const App = () => {
//   const [isReady, setIsReady] = useState(false)
//   const getFonts = async () => {
//     await Font.loadAsync({
//       Recipekorea: require("./src/assets/fonts/Recipekorea.ttf"),
//       HyeminRegular: require("./src/assets/fonts/HyeminRegular.ttf"),
//       HyeminBold: require("./src/assets/fonts/HyeminBold.ttf"),
//     })
//   }

//   const [index, setIndex] = React.useState(4)
//   const [routes] = React.useState([
//     {
//       key: "myCG",
//       title: "내 챌린지",
//       focusedIcon: "home",
//     },
//     { key: "rankingCG", title: "랭킹 챌린지", focusedIcon: "fire" },
//     { key: "userRank", title: "유저랭킹", focusedIcon: "crown" },
//     {
//       key: "myPage",
//       title: "마이페이지",
//       focusedIcon: "account",
//     },
//     { key: "createCG", title: "챌린지 생성", focusedIcon: "crown" },
//   ])

//   const renderScene = BottomNavigation.SceneMap({
//     myCG: MyCGRoute,
//     rankingCG: RankingCGRoute,
//     userRank: UserRankRoute,
//     myPage: MyPageRoute,
//     createCG: CreateCGRoute,
//   })

//   function startScreenChange() {
//     setIndex(0)
//   }
//   // index == 4인 경우 StartScreen 출력, 그 외엔 BottomNav랑 해당 스크린 출력

//   const authCtx = useContext(AuthContext)
//   console.log(authCtx.isAuthenticated)
//   return (
//     <AuthContextProvider>
//       {isReady ? (
//         <View style={styles.rootScreen}>
//           {index == 4 ? (
//             <StartScreen startScreenChange={startScreenChange} />
//           ) : (
//             <BottomNavigation
//               navigationState={{ index, routes }}
//               onIndexChange={setIndex}
//               renderScene={renderScene}
//               compact={false}
//               sceneAnimationType={"shifting"}
//               barStyle={styles.bottomNavContainer}
//               activeColor={`${ColorSet.orangeColor(1)}`}
//               inactiveColor={`${ColorSet.navyColor(1)}`}
//               theme={{
//                 fonts: {
//                   labelMedium: {
//                     fontFamily: "HyeminBold",
//                   },
//                 },
//                 colors: {
//                   onSurfaceVariant: `${ColorSet.navyColor(1)}`,
//                   onSurface: `${ColorSet.orangeColor(1)}`,
//                   secondaryContainer: "#FF999900",
//                 },
//               }}
//             />
//           )}
//         </View>
//       ) : (
//         <AppLoading startAsync={getFonts} onFinish={() => setIsReady(true)} onError={() => {}} />
//       )}
//     </AuthContextProvider>
//   )
// }

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
