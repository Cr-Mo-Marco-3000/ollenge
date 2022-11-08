import React from "react"

import { View, StyleSheet, Image } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"
import { ProgressBar } from "react-native-paper"
import { Calendar } from "react-native-calendars"

import defaultImage from "../../../assets/images/default-image.png"
import { CrownIcon } from "../../../assets/images"

import ColorSet from "../../../style/ColorSet"
import AppBoldText from "../../common/AppBoldText"
import AppText from "../../common/AppText"

function ModalContent({ user }) {
  const defaultImageUri = Image.resolveAssetSource(defaultImage).uri
  const markedDates = {
    "2022-11-08": {
      customStyles: {
        container: {
          backgroundColor: `${ColorSet.orangeColor(0.8)}`,
        },
        text: {
          color: "white",
        },
      },
    },
    "2022-11-09": {
      customStyles: {
        container: {
          backgroundColor: `${ColorSet.orangeColor(0.8)}`,
        },
        text: {
          color: "white",
        },
      },
    },
    "2022-11-01": {
      customStyles: {
        container: {
          backgroundColor: `${ColorSet.orangeColor(0.8)}`,
        },
        text: {
          color: "white",
        },
      },
    },
  }
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
          <View style={styles.bedgeBox}>
            <CrownIcon />
          </View>
        </View>
        <View style={styles.infoBox}>
          <AppBoldText>{user.nickname}</AppBoldText>
          <View style={{ width: "100%", alignItems: "flex-end" }}>
            <AppText size={2}>86%</AppText>
          </View>
          <ProgressBar
            progress={0.86}
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
