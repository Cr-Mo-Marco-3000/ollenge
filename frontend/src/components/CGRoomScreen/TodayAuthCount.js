import React, { useContext, useEffect, useState } from "react"

import { View, StyleSheet } from "react-native"

import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"
import { ClockIcon } from "../../assets/images"
import { RoomContext } from "../../../store/room-context"
import { LocalTime, ConvertDate, DateTime } from "../../functions/index"

function TodayAuthCount({ isTime }) {
  const [diff, setDiff] = useState([0, 0])
  const roomCtx = useContext(RoomContext)

  useEffect(() => {
    const timer = setInterval(() => {
      if (roomCtx) {
        const today = new Date()
        const now = 60 * today.getHours() + today.getMinutes()
        const start =
          60 * Number(roomCtx.roomInfo.startTime.substring(0, 2)) +
          Number(roomCtx.roomInfo.startTime.substring(3, 5))
        const end =
          60 * Number(roomCtx.roomInfo.endTime.substring(0, 2)) +
          Number(roomCtx.roomInfo.endTime.substring(3, 5))

        if (isTime == "waiting") {
          const timeDiff = start - now
          const diffHour = Math.floor((timeDiff / 60) % 24)
          const diffMin = Math.floor(timeDiff % 60)
          setDiff([diffHour, diffMin])
        } else if (isTime == "playing") {
          const timeDiff = end - now
          const diffHour = Math.floor((timeDiff / 60) % 24)
          const diffMin = Math.floor(timeDiff % 60)
          setDiff([diffHour, diffMin])
        }
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [roomCtx])

  return (
    <>
      {isTime != "end" ? (
        <View style={styles.btnContainer}>
          <View style={styles.imgBox}>
            <ClockIcon />
          </View>
          <AppText lineNumber={1} pxSize={20}>
            {isTime == "waiting"
              ? `인증 시작까지  ${diff[0]}시간 ${diff[1]}분 남았습니다`
              : `금일 마감까지 ${diff[0]}시간 ${diff[1]}분 남았습니다`}
          </AppText>
        </View>
      ) : (
        <></>
      )}
    </>
  )
}
export default TodayAuthCount

const styles = StyleSheet.create({
  btnContainer: {
    width: "100%",
    height: 45,
    marginTop: 10,
    backgroundColor: `${ColorSet.grayColor(1)}`,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: "2%",
  },
  imgBox: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
})
