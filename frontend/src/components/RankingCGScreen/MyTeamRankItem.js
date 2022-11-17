import React from "react"

import { StyleSheet, View, Image } from "react-native"

import AppBoldText from "../common/AppBoldText"
import { RFPercentage } from "react-native-responsive-fontsize"
import defaultImage from "../../assets/images/default-image.png"

function MyTeamRankItem({ team }) {
  const defaultImageUri = Image.resolveAssetSource(defaultImage).uri
  return (
    <View style={styles.rankItemBox}>
      <View style={styles.rankInfoBox}>
        <AppBoldText size={2.3} color={"orange"}>
          {team.rank}등
        </AppBoldText>
        <View style={styles.imgBox}>
          <Image
            source={team.challengeImg ? { uri: team.challengeImg } : { uri: defaultImageUri }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <AppBoldText size={2.5} lineNumber={1}>
            {team.challengeName}
          </AppBoldText>
        </View>
        <View style={{ marginLeft: "3%" }}>
          <AppBoldText color={"orange"} size={2.3}>
            {team.challengeScore}점
          </AppBoldText>
        </View>
      </View>
    </View>
  )
}
export default MyTeamRankItem

const styles = StyleSheet.create({
  rankItemBox: {
    flexDirection: "row",
    alignItems: "center",
    height: RFPercentage(10),
    marginBottom: "3%",
    paddingHorizontal: "2%",
    width: "100%",
    bottom: "18%",
  },
  rankInfoBox: {
    backgroundColor: "white",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderRadius: 10,
    marginLeft: "2%",
    paddingHorizontal: "2%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imgBox: {
    width: RFPercentage(10),
    height: RFPercentage(10),
    padding: "2%",
  },
})
