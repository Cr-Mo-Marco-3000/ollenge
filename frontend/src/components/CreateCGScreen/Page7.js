import React, { useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import ColorSet from "../../style/ColorSet"
import PageBase, { fontStyles } from "./PageBase"

const iconLinks = ["../../assets/images/thumb-up.png", "../../assets/images/thumb-down.png"]

// const SignBall = ({ isFilled }) => {
//   const color = isFilled !== "" ? "light green" : "grey"
//   return (
//     <Text style={{ position: "absolute", top: "2%", left: "10%", fontSize: 32, color: `${color}` }}>
//       ●
//     </Text>
//   )
// }

export default function Page7() {
  const [reward, setReward] = useState("asdasd")
  const [penalty, setpenalty] = useState("")

  return (
    <PageBase toNext={"Final"}>
      <View flex={2} justifyContent="flex-end">
        <Text style={fontStyles.HyeminBold({ size: 9, bold: "bold" })}>보상 / 벌칙 입력</Text>
        <Text style={fontStyles.HyeminBold({ size: 5 })}>
          챌린지가 끝난 후 등수에 따른{"\n"}보상 혹은 벌칙이 있다면 입력해주세요
        </Text>
      </View>
      <View style={{ flexDirection: "row", flex: 6 }}>
        <View style={styles.iconFrame}>
          <View style={styles.thumbIcon(reward)}>
            <Image source={require("../../assets/images/thumb-up.png")} />
          </View>
        </View>
        <View style={styles.iconFrame}>
          <View style={styles.thumbIcon(penalty)}>
            <Image source={require("../../assets/images/thumb-down.png")} />
          </View>
        </View>
      </View>
    </PageBase>
  )
}

const styles = StyleSheet.create({
  iconFrame: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  thumbIcon: (content) => {
    return {
      backgroundColor: "white",
      padding: 24,
      borderRadius: 12,
      borderWidth: 6,
      borderColor: content === "" ? "grey" : `${ColorSet.greenColor(1)}`,
    }
  },
})
