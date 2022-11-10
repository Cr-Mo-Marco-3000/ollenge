import React, { useContext } from "react"

import styled from "styled-components"
import { useState, useEffect } from "react"

import TopMargin from "../../common/TopMargin"

import StartUserScreen from "./StartUserScreen"
import WaitingUserScreen from "./WaitingUserScreen"
import { LocalTime, DateTime } from "./../../../functions/index"
import { RoomContext } from "../../../../store/room-context"

function CGUserScreen() {
  const roomCtx = useContext(RoomContext)
  const roomInfo = roomCtx.roomInfo
  const userList = roomCtx.userList
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    const now = LocalTime()
    const start = DateTime(roomInfo.startDate, roomInfo.startTime)
    if (now - start >= 0) {
      setIsStarted(true)
    }
  }, [roomInfo])

  return (
    <Body>
      <TopMargin />
      {isStarted ? (
        <StartUserScreen userList={userList} />
      ) : (
        <WaitingUserScreen userList={userList} roomInfo={roomInfo} />
      )}
    </Body>
  )
}
export default CGUserScreen

const Body = styled.View`
  flex: 1;
  background-color: white;
  width: 100%;
  padding-top: 12%;
`
