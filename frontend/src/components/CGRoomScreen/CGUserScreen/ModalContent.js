import React, { useContext } from "react"

import { View, StyleSheet, Image } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"
import { ProgressBar } from "react-native-paper"
import { Calendar } from "react-native-calendars"

import defaultImage from "../../../assets/images/default-image.png"

import ColorSet from "../../../style/ColorSet"
import AppBoldText from "../../common/AppBoldText"
import AppText from "../../common/AppText"
import { RoomContext } from "./../../../../store/room-context"

function ModalContent({ user }) {
  const defaultImageUri = Image.resolveAssetSource(defaultImage).uri
  const roomCtx = useContext(RoomContext)
  const roomInfo = roomCtx.roomInfo

  const markedDates = new Object()
  for (const date of user.datetimeList) {
    markedDates[`${date.split(" ")[0]}`] = {
      customStyles: {
        container: {
          backgroundColor: `${ColorSet.orangeColor(0.8)}`,
        },
        text: {
          color: "white",
        },
      },
    }
  }

  const startDate = new Date(roomInfo.startDate)
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const date = new Date().getDate()
  const today = new Date(`${year}-${month}-${date}`)

  const wholeDay = Math.round((today.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24 + 1)

  const badgesImg = {
    user: [
      require("../../../assets/images/badges/User-0.png"),
      require("../../../assets/images/badges/User-1.png"),
      require("../../../assets/images/badges/User-2.png"),
      require("../../../assets/images/badges/User-3.png"),
    ],
    ranking1: [
      require("../../../assets/images/badges/WakeUp-0.png"),
      require("../../../assets/images/badges/WakeUp-1.png"),
      require("../../../assets/images/badges/WakeUp-2.png"),
      require("../../../assets/images/badges/WakeUp-3.png"),
    ],
    ranking2: [
      require("../../../assets/images/badges/Exercise-0.png"),
      require("../../../assets/images/badges/Exercise-1.png"),
      require("../../../assets/images/badges/Exercise-2.png"),
      require("../../../assets/images/badges/Exercise-3.png"),
    ],
    ranking3: [
      require("../../../assets/images/badges/Study-0.png"),
      require("../../../assets/images/badges/Study-1.png"),
      require("../../../assets/images/badges/Study-2.png"),
      require("../../../assets/images/badges/Study-3.png"),
    ],
    ranking4: [
      require("../../../assets/images/badges/Pills-0.png"),
      require("../../../assets/images/badges/Pills-1.png"),
      require("../../../assets/images/badges/Pills-2.png"),
      require("../../../assets/images/badges/Pills-3.png"),
    ],
    ranking5: [
      require("../../../assets/images/badges/Salad-0.png"),
      require("../../../assets/images/badges/Salad-1.png"),
      require("../../../assets/images/badges/Salad-2.png"),
      require("../../../assets/images/badges/Salad-3.png"),
    ],

    ranking6: [
      require("../../../assets/images/badges/Cleaning-0.png"),
      require("../../../assets/images/badges/Cleaning-1.png"),
      require("../../../assets/images/badges/Cleaning-2.png"),
      require("../../../assets/images/badges/Cleaning-3.png"),
    ],
  }

  console.log(badgesImg[user.selectedBadge.type][user.selectedBadge.grade - 1])
  return (
    <View style={styles.modalContainer}>
      <View style={styles.topContainer}>
        <View style={styles.imgBox}>
          <View style={styles.profileImgBox}>
            <Image
              source={user.profileImg ? { uri: user.profileImg } : { uri: defaultImageUri }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              resizeMode="cover"
            />
          </View>
          {user.selectedBadge != null ? (
            <View style={styles.bedgeBox}>
              <View style={{ width: RFPercentage(4), height: RFPercentage(4) }}>
                <Image
                  source={badgesImg[user.selectedBadge.type][user.selectedBadge.grade - 1]}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.infoBox}>
          <AppBoldText>{user.nickname}</AppBoldText>
          <View style={{ width: "100%", alignItems: "flex-end" }}>
            <AppText size={2}>{Math.round((user.datetimeList.length / wholeDay) * 100)}%</AppText>
          </View>
          <ProgressBar
            progress={user.datetimeList.length / wholeDay}
            color={`${ColorSet.navyColor(1)}`}
            style={{ height: "40%" }}
          />
        </View>
      </View>
      <View style={styles.middleContainer}>
        <Calendar
          initialDate={undefined}
          minDate="2022-11-01"
          maxDate="2022-12-02"
          markedDates={markedDates}
          markingType={"custom"}
          theme={{
            selectedDayBackgroundColor: "white",
            selectedDayTextColor: `${ColorSet.orangeColor(1)}`,
            arrowColor: `${ColorSet.navyColor(1)}`,
            todayButtonFontFamily: "HyeminBold",
            textDayHeaderFontFamily: "HyeminBold",
            textMonthFontFamily: "HyeminBold",
            textDayFontFamily: "HyeminRegular",
          }}
        />
      </View>
    </View>
  )
}
export default ModalContent

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    flexDirection: "row",
    height: RFPercentage(10),
  },
  imgBox: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: "5%",
  },
  profileImgBox: {
    width: RFPercentage(9),
    height: RFPercentage(9),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bedgeBox: {
    width: RFPercentage(4),
    height: RFPercentage(6),
    backgroundColor: `${ColorSet.grayColor(0.8)}`,
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 10,
    position: "absolute",
    right: -RFPercentage(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoBox: {
    flex: 1,
    paddingHorizontal: "10%",
    justifyContent: "space-around",
  },
  middleContainer: {},
})
