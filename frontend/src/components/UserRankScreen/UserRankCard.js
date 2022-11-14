import { useNavigation } from "@react-navigation/native"
import React from "react"
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native"
import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"

const { width: dw, height: dh } = Dimensions.get("window")

export const UserCard = ({ user }) => {
  return (
    <View style={frameStyles.cardFrame}>
      {/* 순위 표시하는 영역 */}
      <View style={frameStyles.rankNum}>
        <Text style={textStyles.common}>{user.rank}</Text>
      </View>
      {/* 이미지, 뱃지 등 정보 보여줄 곳 */}
      <View style={frameStyles.contentArea}>
        <View style={frameStyles.profileImg}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../../assets/images/default-image.png")}
          />
        </View>
        <View style={frameStyles.badge}>
          <Image
            style={{ width: "60%", height: "60%", alignSelf: "center" }}
            source={require("../../assets/images/heart-icon-1.png")}
          />
        </View>
        <View style={frameStyles.nickname}>
          <Text style={textStyles.common}>{user.nickname}</Text>
        </View>
        <View style={frameStyles.userScore}>
          <Text style={textStyles.common}>{user.userScore}점</Text>
        </View>
      </View>
    </View>
  )
}

export default function UserRankCard({ userList }) {
  const navigation = useNavigation()

  function getDetail(user) {
    navigation.navigate("UserBadge", { user })
  }

  return (
    <>
      <ScrollView style={{ width: "100%", flex: 1, paddingTop: 24 }}>
        {userList.map((user) => {
          return (
            <TouchableOpacity key={user.userId} style={{ flex: 1 }} onPress={() => getDetail(user)}>
              <UserCard user={user} />
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </>
  )
}

const baseStyle = (num) => {
  return {
    flex: num,
    alignItem: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  }
}

const frameStyles = StyleSheet.create({
  cardFrame: {
    flex: 1,
    flexDirection: "row",
    height: (dw * 3) / 17,
    marginBottom: 8,
    paddingRight: "4%",
  },

  contentArea: {
    flex: 16,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "rgb(250, 253, 255)",
    elevation: 8,
  },

  rankNum: { ...baseStyle(2) },
  profileImg: {
    ...baseStyle(3),
    background: "black",
    borderRadius: 10,
    overflow: "hidden",
  },
  badge: { ...baseStyle(3) },
  nickname: { ...baseStyle(4) },
  userScore: { ...baseStyle(4) },
})

const textStyles = StyleSheet.create({
  common: {
    textAlign: "center",
  },
})
