import React from "react"

import { createContext, useState } from "react"
import { AuthorizationInstance } from "../src/api/settings"

const instance = AuthorizationInstance()

export const RoomContext = createContext({
  roomInfo: new Object(),
  userList: new Array(),
  getRoomInfo: (challengeId) => {},
  getUserList: (challengeId) => {},
})

function RoomContextProvider({ children }) {
  const [info, setCGinfo] = useState(new Object())
  const [user, setUser] = useState(new Array())

  function getRoom(challengeId) {
    instance
      .get(`/api/challenge/${challengeId}`)
      .then((res) => {
        setCGinfo(res.data.challengeInfoList)
      })
      .catch((err) => {
        console.log(err)
        setCGinfo(new Object())
      })
  }

  function getUser(challengeId) {
    instance
      .get(`/api/challenge/state/${challengeId}`)
      .then((res) => setUser(res.data.challengeStateList))
      .catch((err) => {
        console.log(err)
        setUser(new Array())
      })
  }

  const value = {
    roomInfo: info,
    userList: user,
    getRoomInfo: getRoom,
    getUserList: getUser,
  }

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>
}

export default RoomContextProvider
