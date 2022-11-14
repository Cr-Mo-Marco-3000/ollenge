import React from "react"
import { Button, ScrollView, View } from "react-native"
import TopMargin from "../common/TopMargin"
import TopUserArea from "./TopUserArea"
import UserRankCard from "./UserRankCard"
import { LinearGradient } from "expo-linear-gradient"
import ColorSet from "../../style/ColorSet"
import DeviceInfo from "../../style/DeviceInfo"
import PageBase from "./PageBase"
import { UserCard } from "./UserRankCard"

const { dw, dh } = DeviceInfo

export default function RankList({ rankInfo }) {
  const userList = rankInfo.rankingList
  const myInfo = rankInfo.userRank
  return (
    <PageBase>
      <ScrollView style={{ width: "100%", flex: 1, marginBottom: (dw * 4) / 17 }}>
        <TopUserArea topUsers={userList.slice(0, 3)} />
        <UserRankCard userList={userList.slice(3, 10)} />
      </ScrollView>
      <View
        style={{
          width: "100%",
          height: (dw * 4) / 17,
          position: "absolute",
          bottom: 0,

          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            margin: 4,
            paddingTop: 8,
            borderRadius: 12,
            backgroundColor: "rgba(255, 255, 255, 0)",
          }}
        >
          <UserCard user={myInfo} />
        </View>
      </View>
    </PageBase>
  )
}
