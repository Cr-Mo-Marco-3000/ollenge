import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { dw, dh } from "../../style/DeviceInfo"

const TopCard = ({ flex, user }) => {
  const navigation = useNavigation()
  const getDetail = () => {
    navigation.navigate("UserBadge", { user })
  }
  return (
    <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.5} onPress={() => getDetail(user)}>
      <View flex={flex} style={frameStyle.cardFrame(flex)}>
        {flex === 5 && (
          <Image source={require("../../assets/images/crown.png")} style={{ zIndex: 50 }} />
        )}
        <View style={frameStyle.imgFrame(flex)}>
          <Image
            source={require("../../assets/images/default-image.png")}
            style={{ width: (dw * flex) / 12, height: (dw * flex) / 12 }}
          />
        </View>
        <Image
          source={
            flex === 5
              ? require("../../assets/images/UserRankList/1st_place.png")
              : flex === 4
              ? require("../../assets/images/UserRankList/2nd_place.png")
              : require("../../assets/images/UserRankList/3rd_place.png")
          }
          style={{
            width: (dw * flex) / 35,
            height: (dw * flex) / 35,
            position: "absolute",
            bottom: "15%",
            left: ["10%", "0%", "-10%"][flex - 3],
          }}
        />
        <Text>{user.nickname}</Text>
        <Text>{user.userScore}점</Text>
      </View>
    </TouchableOpacity>
  )
}

// source={require("../../assets/images/default-image.png")}
export default function TopUserArea({ topUsers }) {
  return (
    <View style={frameStyle.wholeFrame}>
      <TopCard flex={4} user={topUsers[1]} />
      <TopCard flex={5} user={topUsers[0]} />
      <TopCard flex={3} user={topUsers[2]} />
    </View>
  )
}

const frameStyle = StyleSheet.create({
  wholeFrame: {
    flexDirection: "row",
    flex: 1,
    paddingLeft: "10%",
    paddingRight: "10%",
  },

  cardFrame: (flex) => {
    return {
      paddnig: "6%",
      justifyContent: "flex-end",
      alignItems: "center",
      zIndex: flex === 5 ? 40 : 10,
    }
  },

  imgFrame: (flex) => {
    return {
      justifyContent: "flex-end",
      borderRadius: 90,
      elevation: 20,
      shadowColor: ["rgb(196, 126, 82)", "rgb(220, 255, 0)", "rgb(255, 146, 9)"][flex - 3],
      overflow: "hidden",
      marginBottom: 12,
    }
  },
})
