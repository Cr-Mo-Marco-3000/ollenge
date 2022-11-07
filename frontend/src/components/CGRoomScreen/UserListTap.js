import React from "react"

import { View, StyleSheet, ScrollView, Pressable } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"
import { Avatar } from "react-native-paper"
import { useContext } from "react"
import { LinearGradient } from "expo-linear-gradient"

import ColorSet from "../../style/ColorSet"
import ProfileBedge from "./ProfileBedge"
import { AuthContext } from "../../../store/auth-context"

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
]

function UserListTap({ navigation }) {
  const authCtx = useContext(AuthContext)
  const userInfo = authCtx.userInfo
  return (
    <View style={styles.imgListContainer}>
      <View style={styles.myProfileBox}>
        <ProfileBedge url={userInfo.profileImg} isActive={false} />
      </View>
      <ScrollView
        style={styles.userListBox}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {userList.map((user, index) => {
          return <ProfileBedge key={index} url={user.profileImg} isActive={false} />
        })}
      </ScrollView>
      <LinearGradient
        colors={["rgba(128, 167, 179,0)", "#80A7B3"]}
        style={styles.infoBox}
        start={{ x: 0.1, y: 1 }}
        end={{ x: 0.7, y: 1 }}
      >
        <Pressable onPress={() => navigation.push("CGUser")}>
          <Avatar.Icon
            size={RFPercentage(7)}
            icon="dots-horizontal"
            color={`${ColorSet.navyColor(1)}`}
            style={{
              backgroundColor: `${ColorSet.grayColor(1)}`,
            }}
          />
        </Pressable>
      </LinearGradient>
    </View>
  )
}
export default UserListTap

const styles = StyleSheet.create({
  imgListContainer: {
    flexDirection: "row",
    height: RFPercentage(9),
    backgroundColor: "#80A7B3",
    overflow: "hidden",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingHorizontal: "2%",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 100,
    alignItems: "center",
  },
  myProfileBox: {
    borderRightWidth: 2,
    borderRightColor: "white",
  },
  userListBox: {
    // flex: 1,
    paddingLeft: "2%",
    paddingRight: "5%",
    marginRight: RFPercentage(5),
  },
  infoBox: {
    position: "absolute",
    right: "2%",
    paddingLeft: RFPercentage(1),
  },
})
