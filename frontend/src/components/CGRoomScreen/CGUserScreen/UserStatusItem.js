import React, { useState, useEffect } from "react"

import { Pressable, StyleSheet, View } from "react-native"
import { Modal, Portal, Text } from "react-native-paper"

import AppBoldText from "../../common/AppBoldText"
import DateCheckBox from "./DateCheckBox"
import ModalContent from "./ModalContent"
import { ConvertDate } from "../../../functions/index"

function UserStatusItem({ user }) {
  const dayLst = ["월", "화", "수", "목", "금", "토", "일"]
  const [visible, setVisible] = useState(false)

  const flag = new Array(7).fill(false)
  const today = new Date()
  const day = new Date().getDay()

  for (var i = 0; i < day; i++) {
    const tempDay = new Date(today)
    tempDay.setDate(today.getDate() - i)
    const checkDate = ConvertDate(tempDay)
    if (user.datetimeList.includes(checkDate)) {
      flag[i] = 1
    }
  }

  function showModal() {
    setVisible(true)
  }

  function hideModal() {
    setVisible(false)
  }

  const containerStyle = {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  }
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          style={{ alignItems: "center", paddingHorizontal: "10%", paddingVertical: "10%" }}
        >
          <ModalContent user={user} />
        </Modal>
      </Portal>
      <Pressable style={styles.rootContainer} onPress={showModal}>
        <View style={styles.infoContainer}>
          <AppBoldText>{user.nickname}</AppBoldText>
          <View style={styles.dayContainer}>
            {dayLst.map((weekday, key) => {
              return <DateCheckBox weekday={weekday} checked={flag[key]} key={key} />
            })}
          </View>
        </View>
      </Pressable>
    </>
  )
}
export default UserStatusItem

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    backgroundColor: "white",
    marginVertical: "5%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingVertical: "3%",
  },
  dayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
