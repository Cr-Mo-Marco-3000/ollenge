import React, { useContext } from "react"

import { StyleSheet, Image, Pressable, View } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"

import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"
import { AuthContext } from "../../../store/auth-context"

function GainedBedgeItem({ type, typeData, grade }) {
  const authCtx = useContext(AuthContext)
  const userBadge = authCtx.userInfo.selectedBadge

  let applied = false
  if (type == userBadge.type && grade == userBadge.grade) {
    applied = true
  }

  return (
    <Pressable style={styles.bedgeItem}>
      <Image source={typeData.src[grade]} style={styles.bedgeImage} />
      <AppText size={2}>
        {typeData.title} {typeData.checkpoint[grade]}회 완주
      </AppText>
      {applied ? (
        <View style={styles.bedgeButton}>
          <AppText size={2}>착용 중</AppText>
        </View>
      ) : (
        <></>
      )}
    </Pressable>
  )
}
export default GainedBedgeItem

const styles = StyleSheet.create({
  bedgeItem: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  bedgeImage: {
    height: RFPercentage(8),
    width: RFPercentage(8),
  },
  bedgeButton: {
    position: "absolute",
    top: RFPercentage(3),
    backgroundColor: `${ColorSet.greenColor(1)}`,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 20,
    wordBreak: "nowrap",
  },
})
