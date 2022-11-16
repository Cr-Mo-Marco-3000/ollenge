import React from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"

import TopUserArea from "./TopUserArea"
import UserRankCard from "./UserRankCard"
import DeviceInfo, { dh } from "../../style/DeviceInfo"
import PageBase from "./PageBase"
import { UserCard } from "./UserRankCard"
import { useNavigation } from "@react-navigation/native"
import TopMargin from "../common/TopMargin"

const { dw } = DeviceInfo

const RankList = ({ rankInfo }) => {
  const userList = rankInfo.rankingList
  const navigation = useNavigation()
  const myInfo = rankInfo.userRank
  return (
    <PageBase>
      <View style={{ width: "100%", flex: 1, position: "relative" }}>
        <ScrollView
          style={{
            width: "100%",
            flex: 1,
            position: "relative",
          }}
        >
          <TopUserArea topUsers={userList.slice(0, 3)} />
          <UserRankCard userList={userList.slice(3, 10)} />
          <View style={{ paddingBottom: dh * 0.12 }}></View>
        </ScrollView>
        <View
          style={{
            width: "100%",
            height: (dw * 4) / 17,
            position: "absolute",
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              flex: 1,
              paddingTop: 8,
              borderRadius: 12,
              backgroundColor: "rgba(255, 255, 255, 0)",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("UserBadge", { user: myInfo })}
          >
            <UserCard user={myInfo} isMe={true} />
          </TouchableOpacity>
        </View>
      </View>
    </PageBase>
  )
}

export default RankList
