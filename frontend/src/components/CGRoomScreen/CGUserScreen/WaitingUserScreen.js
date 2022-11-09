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
  return (
    <Provider>
      <LinearGradient style={{ flex: 1 }} colors={["white", `${ColorSet.paleBlueColor(1)}`]}>
        <View style={{ alignSelf: "center", marginBottom: "5%" }}>
          <AppBoldText>현재 {userList.length}명이 대기 중</AppBoldText>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.innerScrollContainer}>
            {userList.map((user, key) => {
              return <RankUserItem user={user} key={key} noRank={true} />
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
