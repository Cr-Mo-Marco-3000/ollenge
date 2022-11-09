import React from "react"

import { View, StyleSheet } from "react-native"

import AppButton from "../common/AppButton"

function CGAuthBtn({ navigation }) {
  return (
    <View style={styles.buttonBox}>
      <AppButton
        title={"오늘 챌린지 인증하기"}
        weight={1}
        pxSize={20}
        handler={() => navigation.push("CGAuth", { methodNum: 1, participationId: 3 })}
      ></AppButton>
    </View>
  )
}
export default CGAuthBtn

const styles = StyleSheet.create({
  buttonBox: {
    width: "100%",
    height: 45,
    marginTop: 10,
  },
})
