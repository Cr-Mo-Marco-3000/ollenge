import React from "react"

import { ScrollView, StyleSheet, View, Text } from "react-native"
import { useState, useContext } from "react"

import ColorSet from "../../../style/ColorSet"

import FirtstUserItem from "./FirstUserItem"
import RankUserItem from "./RankUserItem"
import MyRankItem from "./MyRankItem"

import { AuthContext } from "../../../../store/auth-context"
import { RoomContext } from "../../../../store/room-context"

function UserRanking({ userList }) {
  const [myInfo, setMyInfo] = useState()
  const [myRank, setMyRank] = useState()
  const authCtx = useContext(AuthContext)
  const roomCtx = useContext(RoomContext)
  const roomInfo = roomCtx.roomInfo

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

  const startDate = new Date(roomInfo.startDate)
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const date = new Date().getDate()
  const today = new Date(`${year}-${month}-${date}`)

  const wholeDay = Math.round((today.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24 + 1)

  return (
    <View style={styles.rootScreen}>
      <ScrollView style={styles.scrollScreen}>
        <View style={styles.scrollInnerScreen}>
          {userList.map((user, key) => {
            if (!myInfo && user.userId == authCtx.userInfo.userId) {
              setMyInfo(user)
              setMyRank(key + 1)
            }

            if (key == 0) {
              return (
                <FirtstUserItem
                  user={user}
                  key={key}
                  wholeDay={wholeDay}
                  src={
                    user.selectedBadge
                      ? badgesImg[user.selectedBadge.type][user.selectedBadge.grade - 1]
                      : null
                  }
                />
              )
            } else {
              return (
                <RankUserItem
                  user={user}
                  key={key}
                  rank={key + 1}
                  wholeDay={wholeDay}
                  src={
                    user.selectedBadge
                      ? badgesImg[user.selectedBadge.type][user.selectedBadge.grade - 1]
                      : null
                  }
                />
              )
            }
          })}
        </View>
      </ScrollView>
      {myInfo ? (
        <MyRankItem
          user={myInfo}
          rank={myRank}
          wholeDay={wholeDay}
          src={
            myInfo.selectedBadge
              ? badgesImg[myInfo.selectedBadge.type][myInfo.selectedBadge.grade - 1]
              : null
          }
        />
      ) : null}
    </View>
  )
}
export default UserRanking

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: `${ColorSet.paleBlueColor(1)}`,
    alignItems: "center",
  },
  scrollScreen: {
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    width: "100%",
    flex: 1,
  },
  scrollInnerScreen: {
    paddingBottom: "40%",
  },
})
