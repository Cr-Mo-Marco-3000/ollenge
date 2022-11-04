import React, { useEffect } from "react"

import { createContext, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  isSigned: false,
  authenticate: (token) => {},
  signed: (flag) => {},
  logout: () => {},
})

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState()
  const [userFalg, setUserFlag] = useState()

  function authenticate(token) {
    setAuthToken(token)
    AsyncStorage.setItem("token", token)
  }

  function signed(flag) {
    setUserFlag(flag)
    AsyncStorage.setItem("userFlag", userFalg)
  }

  function logout() {
    setAuthToken(null)
    AsyncStorage.removeItem("token")
    AsyncStorage.removeItem("userFlag")
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    isSigned: userFalg,
    authenticate: authenticate,
    signed: signed,
    logout: logout,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
