import React from "react"

import { View, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import { Provider } from "react-native-paper"

import ColorSet from "../style/ColorSet"

import TopMargin from "./../components/common/TopMargin"
import AppButton from "./../components/common/AppButton"
import UserListTap from "../components/CGRoomScreen/UserListTap"
import CGRoomInfoTag from "../components/CGRoomScreen/CGRoomInfoTag"

function CGRoomScreen({ roomInfo }) {
  const navigation = useNavigation()
  return (
    <Provider>
      <LinearGradient
        style={{ flex: 1 }}
        colors={[`${ColorSet.whiteColor(1)}`, `${ColorSet.paleBlueColor(1)}`]}
      >
        <TopMargin />
        <TopMargin />
        <UserListTap navigation={navigation} />
        <CGRoomInfoTag roomInfo={roomInfo} />
        <View style={{ height: 50, marginTop: 100 }}>
          <AppButton
            title={"인증이미지등록"}
            handler={() => navigation.push("CGImg", { methodNum: 0, participationId: 3 })}
          ></AppButton>
        </View>
        <View style={{ height: 50 }}>
          <AppButton
            title={"인증"}
            handler={() => navigation.push("CGAuth", { methodNum: 1, participationId: 3 })}
          ></AppButton>
        </View>
      </LinearGradient>
    </Provider>
  )
}
export default CGRoomScreen

const styles = StyleSheet.create({})
