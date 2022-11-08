import React from "react"

import { ScrollView, StyleSheet, View } from "react-native"
import { useState, useContext } from "react"

import ColorSet from "../../../style/ColorSet"

import FirtstUserItem from "./FirstUserItem"
import RankUserItem from "./RankUserItem"
import MyRankItem from "../MyRankItem"

import { AuthContext } from "../../../../store/auth-context"

const userList = [
  {
    userId: 1,
    nickname: "메롱",
    profileImg: "",
    dateTimeList: ["2022-11-07 10:11:10"],
  },
  {
    userId: 2,
    nickname: "메롱",
    profileImg: "",
    dateTimeList: ["2022-11-07 10:11:10"],
  },
  {
    userId: 4,
    nickname: "메롱",
    profileImg: "",
    dateTimeList: ["2022-11-07 10:11:10"],
  },
  {
    userId: 4,
    nickname: "메롱",
    profileImg: "",
    dateTimeList: ["2022-11-07 10:11:10"],
  },
  {
    userId: 4,
    nickname: "메롱",
    profileImg: "",
    dateTimeList: ["2022-11-07 10:11:10"],
  },
  {
    userId: 4,
    nickname: "메롱",
    profileImg: "",
    dateTimeList: ["2022-11-07 10:11:10"],
  },
]

function UserRanking() {
  const [myInfo, setMyInfo] = useState()
  const [myRank, setMyRank] = useState()
  const authCtx = useContext(AuthContext)
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
              return <FirtstUserItem user={user} key={key} />
            } else {
              return <RankUserItem user={user} key={key} rank={key + 1} />
            }
          })}
        </View>
      </ScrollView>
      {/* {myInfo ? <MyRankItem user={myInfo} rank={myRank} /> : null} */}
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
    paddingHorizontal: "10%",
    width: "100%",
    flex: 1,
  },
  scrollInnerScreen: {
    paddingBottom: "40%",
  },
})
