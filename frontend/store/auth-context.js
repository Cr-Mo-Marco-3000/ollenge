import React from "react"

import { createContext, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AuthorizationInstance } from "../src/api/settings"
import * as Notification from "expo-notifications"

const instance = AuthorizationInstance()

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  isSigned: false,
  userInfo: new Object(),
  badgeData: new Object(),
  authenticate: (token) => {},
  getInfo: () => {},
  getBadgeData: (userId) => {},
  signed: (flag) => {},
  logout: () => {},
})

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState()
  const [userFlag, setUserFlag] = useState()
  const [pushToken, setPushToken] = useState("")
  const [info, setInfo] = useState()
  const [badge, setBadge] = useState()

  function authenticate(token) {
    setAuthToken(token)
    AsyncStorage.setItem("token", token)
    getPushToken()
    infoData()
  }

  function infoData() {
    instance
      .get("/api/user")
      .then((res) => {
        setInfo(res.data)
        instance
          .get(`/api/badge/${res.data.userId}`)
          .then((res) => setBadge(res.data.badgeList))
          .catch((err) => console.log(err))
      })
      .catch((err) => {
        console.log(err)
        logout()
      })
  }

  function getBadge(userId) {
    instance
      .get(`/api/badge/${userId}`)
      .then((res) => setBadge(res.data.badgeList))
      .catch((err) => console.log(err))
  }

  function getPushToken() {
    Notification.getExpoPushTokenAsync().then((res) => {
      instance
        .patch("/api/user", { userDescription: res.data })
        .then((res) => console.log(res))
        .catch((res) => console.log(res))
    })
  }

  function signed(flag) {
    setUserFlag(flag)
    AsyncStorage.setItem("userFlag", flag)
  }

  function logout() {
    setAuthToken(null)
    setUserFlag(false)
    AsyncStorage.removeItem("token")
    AsyncStorage.removeItem("userFlag")
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    isSigned: userFlag,
    userInfo: info,
    badgeData: badge,
    authenticate: authenticate,
    getInfo: infoData,
    getBadgeData: getBadge,
    signed: signed,
    logout: logout,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
