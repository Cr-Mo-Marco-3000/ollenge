import React, { useContext } from "react"

import { View, StyleSheet } from "react-native"

import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"
import { ClockIcon } from "../../assets/images"
import { RoomContext } from "../../../store/room-context"

function CGStartCount() {
  const roomCtx = useContext(RoomContext)
  const nowDate = new Date().getTime()
  const startDate = new Date(roomCtx.roomInfo.startDate).getTime()
  const dDate = Math.ceil((startDate - nowDate) / 1000 / 60 / 60 / 24)
  return (
    <View style={styles.btnContainer}>
      <View style={styles.imgBox}>
        <ClockIcon />
      </View>
      <AppText lineNumber={1} pxSize={20}>
        {dDate != 0 ? `챌린지 시작까지 ${dDate}일 남았습니다` : "오늘 챌린지가 시작됩니다!"}
      </AppText>
    </View>
  )
}
export default CGStartCount

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
