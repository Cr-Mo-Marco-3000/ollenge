import React, { useContext } from "react"

import { useState } from "react"
import { StyleSheet, View, ScrollView } from "react-native"

import ColorSet from "../../../style/ColorSet"
import UserStatusItem from "./UserStatusItem"
import { Provider } from "react-native-paper"
import { AuthContext } from "./../../../../store/auth-context"

function UserStatus({ userList }) {
  const authCtx = useContext(AuthContext)
  const myUserId = authCtx.userInfo.userId
  const [myInfo, setMyInfo] = useState()

  return (
    <Provider>
      <View style={styles.rootScreen}>
        <ScrollView style={styles.scrollScreen}>
          <View style={styles.scrollInnerScreen}>
            <UserStatusItem user={myInfo} />
            {userList.map((user, key) => {
              if (!myInfo && user.userId === myUserId) {
                setMyInfo(user)
                console.log(myUserId)
                return
              } else if (user.userId !== myUserId) {
                return <UserStatusItem user={user} key={key} />
              }
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
