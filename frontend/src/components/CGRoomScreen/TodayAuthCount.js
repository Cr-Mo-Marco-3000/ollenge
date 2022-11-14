import React, { useContext, useEffect, useState } from "react"

import { View, StyleSheet } from "react-native"

import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"
import { ClockIcon } from "../../assets/images"
import { RoomContext } from "../../../store/room-context"
import { LocalTime, ConvertDate, DateTime } from "../../functions/index"

function TodayAuthCount() {
  const [diff, setDiff] = useState([0, 0, 0])
  const roomCtx = useContext(RoomContext)

  useEffect(() => {
    const timer = setInterval(() => {
      const today = LocalTime()
      const todayDate = ConvertDate(today)
      const endTime = DateTime(todayDate, roomCtx.roomInfo.endTime)
      const startTime = DateTime(todayDate, roomCtx.roomInfo.startTime)
      if (today < startTime) {
        const timeDiff = startTime - today
        const flag = 1
        const diffHour = Math.floor((timeDiff / (1000 * 60 * 60)) % 24)
        const diffMin = Math.floor((timeDiff / (1000 * 60)) % 60)
        setDiff([flag, diffHour, diffMin])
      } else if (startTime <= today < endTime) {
        const timeDiff = endTime - today
        const flag = 2
        const diffHour = Math.floor((timeDiff / (1000 * 60 * 60)) % 24)
        const diffMin = Math.floor((timeDiff / (1000 * 60)) % 60)
        setDiff([flag, diffHour, diffMin])
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {diff[0] != 0 ? (
        <View style={styles.btnContainer}>
          <View style={styles.imgBox}>
            <ClockIcon />
          </View>
          <AppText lineNumber={1} pxSize={20}>
            {diff[0] == 1
              ? `인증 시작까지  ${diff[1]}시간 ${diff[2]}분 남았습니다`
              : `금일 마감까지 ${diff[1]}시간 ${diff[2]}분 남았습니다`}
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
