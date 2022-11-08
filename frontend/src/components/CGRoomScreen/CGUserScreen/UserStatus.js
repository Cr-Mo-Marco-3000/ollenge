import React from "react"
import { StyleSheet, View, ScrollView } from "react-native"

import AppText from "../../common/AppText"
import ColorSet from "../../../style/ColorSet"
import UserStatusItem from "./UserStatusItem"
import { Provider } from "react-native-paper"

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

function UserStatus() {
  return (
    <Provider>
      <View style={styles.rootScreen}>
        <ScrollView style={styles.scrollScreen}>
          <View style={styles.scrollInnerScreen}>
            {userList.map((user, key) => {
              return <UserStatusItem user={user} key={key} />
            })}
          </View>
        </ScrollView>
      </View>
    </Provider>
  )
}
export default UserStatus

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: `${ColorSet.paleBlueColor(1)}`,
    alignItems: "center",
  },
  scrollScreen: {
    flex: 1,
    width: "100%",
  },
  scrollInnerScreen: {
    flex: 1,
    paddingVertical: "10%",
    width: "100%",
    paddingHorizontal: "5%",
  },
})
