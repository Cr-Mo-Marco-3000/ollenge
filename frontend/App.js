import * as React from "react"
import { StyleSheet } from "react-native"
import * as Font from "expo-font"
import AppLoading from "expo-app-loading"
import { useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import StartScreen from "./src/screens/StartScreen"
import MyCGScreen from "./src/screens/MyCGScreen"
import RankingCGScreen from "./src/screens/RankingCGScreen"
import UserRankScreen from "./src/screens/UserRankScreen"
import MyPageScreen from "./src/screens/MyPageScreen"

import ColorSet from "./src/style/ColorSet"
import AuthContextProvider, { AuthContext } from "./store/auth-context"
import RoomContextProvider from "./store/room-context"
import { RFPercentage } from "react-native-responsive-fontsize"

function AuthStack() {
  return <StartScreen />
}

function AuthenticatedStack() {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12, fontFamily: "HyeminBold", paddingBottom: 5 },
        tabBarActiveTintColor: `${ColorSet.orangeColor(1)}`,
        tabBarInactiveTintColor: `${ColorSet.navyColor(1)}`,
        tabBarStyle: { height: 70, paddingBottom: 5 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="내 챌린지"
        component={MyCGScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="랭킹 챌린지"
        component={RankingCGScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="fire" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="유저 랭킹"
        component={UserRankScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="crown" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MyPageScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

function Navigation() {
  const authCtx = useContext(AuthContext)
  return (
    <NavigationContainer>
      {authCtx.token && authCtx.isSigned ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  )
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
        <RoomContextProvider>
          <Root />
        </RoomContextProvider>
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
