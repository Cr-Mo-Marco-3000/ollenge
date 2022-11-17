import React from "react"

import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, ScrollView, View } from "react-native"
import { Provider } from "react-native-paper"

import ColorSet from "../../../style/ColorSet"
import RankUserItem from "./RankUserItem"
import AppBoldText from "../../common/AppBoldText"
import AppText from "./../../common/AppText"
import InviteCodeBtn from "./../InviteCodeBtn"

function WaitingUserScreen({ userList, roomInfo }) {
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
  return (
    <Provider>
      <LinearGradient style={{ flex: 1 }} colors={["white", `${ColorSet.paleBlueColor(1)}`]}>
        <View style={{ alignSelf: "center", marginBottom: "5%" }}>
          <AppBoldText>현재 {userList.length}명이 대기 중</AppBoldText>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.innerScrollContainer}>
            {userList.map((user, key) => {
              return (
                <RankUserItem
                  user={user}
                  key={key}
                  noRank={true}
                  src={
                    user.selectedBadge
                      ? badgesImg[user.selectedBadge.type][user.selectedBadge.grade]
                      : null
                  }
                />
              )
            })}
          </View>
        </ScrollView>
        <AppText pxSize={17} color={"orange"}>
          친구들을 초대해 함께하세요!
        </AppText>
        <View style={{ width: 200, alignSelf: "center", marginBottom: "10%" }}>
          <InviteCodeBtn inviteCode={roomInfo.inviteCode} challengeId={roomInfo.challengeId} />
        </View>
      </LinearGradient>
    </Provider>
  )
}
export default WaitingUserScreen

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  innerScrollContainer: {
    paddingHorizontal: "5%",
    zIndex: 10,
    marginBottom: "5%",
  },
})
