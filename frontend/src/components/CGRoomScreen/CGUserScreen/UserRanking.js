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
  const roomInfo = useContext(RoomContext)

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
              return <FirtstUserItem user={user} key={key} wholeDay={wholeDay} />
            } else {
              return <RankUserItem user={user} key={key} rank={key + 1} wholeDay={wholeDay} />
            }
          })}
        </View>
      </ScrollView>
      {myInfo ? <MyRankItem user={myInfo} rank={myRank} wholeDay={wholeDay} /> : null}
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
