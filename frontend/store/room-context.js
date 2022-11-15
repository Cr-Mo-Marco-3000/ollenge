import React from "react"

import { createContext, useState } from "react"
import { AuthorizationInstance } from "../src/api/settings"

const instance = AuthorizationInstance()

export const RoomContext = createContext({
  roomInfo: new Object(),
  userList: new Array(),
  isAuthed: false,
  isResist: false,
  getRoomInfo: (challengeId) => {},
  getUserList: (challengeId) => {},
  getTodayAuth: (challengeId) => {},
  getImgResist: (challengeId) => {},
})

function RoomContextProvider({ children }) {
  const [info, setCGinfo] = useState(new Object())
  const [user, setUser] = useState(new Array())
  const [auth, setAuth] = useState(false)
  const [resist, setResist] = useState(false)

  function getRoom(challengeId) {
    instance
      .get(`/api/challenge/${challengeId}`)
      .then((res) => {
        setCGinfo(res.data.challengeInfoList)
        getAuth(challengeId)
        getResist(challengeId)
      })
      .catch((err) => {
        console.log(err)
        setCGinfo(new Object())
      })
  }

  function getUser(challengeId) {
    instance
      .get(`/api/challenge/state/${challengeId}`)
      .then((res) => {
        const userState = res.data.challengeStateList
        setUser(userState)
      })
      .catch((err) => {
        console.log(err)
        setUser(new Array())
      })
  }

  const getAuth = function (challengeId) {
    instance
      .get(`/auth/isauthtoday/${challengeId}`)
      .then((res) => setAuth(res.data.isauthed))
      .catch((err) => console.log(err))
  }

  const getResist = function (challengeId) {
    instance
      .get(`/auth/isstdimg/${challengeId}`)
      .then((res) => setResist(res.data.isauthed))
      .catch((err) => console.log(err))
  }

  const value = {
    roomInfo: info,
    userList: user,
    isAuthed: false,
    isResist: false,
    getRoomInfo: getRoom,
    getUserList: getUser,
    getTodayAuth: getAuth,
    getImgResist: getResist,
  }

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>
}

export default RoomContextProvider
