import React from "react"

import { Pressable, ScrollView, View, StyleSheet } from "react-native"
import { AntDesign } from "@expo/vector-icons"

import { AuthorizationInstance } from "../../api/settings"
import ColorSet from "../../style/ColorSet"
import TopMargin from "./../common/TopMargin"
import { dh } from "../../style/DeviceInfo"

function ProceedingRank({ challengeInfo, hideModal }) {
  const instance = AuthorizationInstance()
  instance
    .get(`/api/challenge/ongoing/${challengeInfo.challengePresetID}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))

  return (
    <View style={{ flex: 1 }}>
      <TopMargin />
      <View style={{ height: "2%" }} />
      <Pressable onPress={hideModal} style={{ marginLeft: "4%" }}>
        <AntDesign name="arrowleft" size={24} color={`${ColorSet.navyColor(1)}`} />
      </Pressable>
      <ScrollView style={styles.scrollContainer}></ScrollView>
    </View>
  )
}
export default ProceedingRank

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
})
