import React, { useEffect } from "react"

import { View, StyleSheet, ScrollView, Pressable } from "react-native"

import { RFPercentage } from "react-native-responsive-fontsize"
import { Avatar } from "react-native-paper"
import { useContext, useState } from "react"
import { LinearGradient } from "expo-linear-gradient"
import ColorSet from "../../style/ColorSet"
import ProfileBedge from "./ProfileBedge"
import { AuthContext } from "../../../store/auth-context"
import { RoomContext } from "../../../store/room-context"
import { TodayCheck } from "../../functions"
import { CGStartFlag, CGAuthTimeFlag } from "../../functions/index"

function UserListTap({ navigation }) {
  const authCtx = useContext(AuthContext)
  const roomCtx = useContext(RoomContext)
  const roomInfo = roomCtx.roomInfo
  const [isStarted, setIsStarted] = useState("")
  const [isTime, setIsTime] = useState("")

  useEffect(() => {
    setIsStarted(CGStartFlag(roomInfo.startDate, roomInfo.endDate))
    setIsTime(CGAuthTimeFlag(roomInfo.startTime, roomInfo.endTime))
  }, [roomInfo])

  const userInfo = authCtx.userInfo
  const userList = roomCtx.userList

  const [myInfo, setMyInfo] = useState()

  useEffect(() => {
    if (userList) {
      userList.map((user) => {
        if (user.userId == userInfo.userId) {
          setMyInfo(user)
        }
      })
    }
  }, [userList])

  return (
    <View style={styles.imgListContainer}>
      <View style={styles.myProfileBox}>
        {myInfo ? <ProfileBedge isActive={TodayCheck(myInfo.datetimeList)} user={myInfo} /> : null}
      </View>
      <ScrollView
        style={styles.userListBox}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {userList.map((user, index) => {
          if (user.userId !== userInfo.userId) {
            return (
              <ProfileBedge
                key={index}
                isActive={TodayCheck(user.datetimeList)}
                pushtoken={user.userDescription}
                isStarted={isStarted}
                isTime={isTime}
                user={user}
              />
            )
          }
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
