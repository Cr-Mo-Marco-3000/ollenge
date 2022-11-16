import React from "react"

import { Image, StyleSheet, View } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"

import AppBoldText from "../../common/AppBoldText"
import defaultImage from "../../../assets/images/default-image.png"

function RankUserItem({ user, rank, noRank, wholeDay, src }) {
  const defaultImageUri = Image.resolveAssetSource(defaultImage).uri

  return (
    <View style={styles.rootScreen}>
      {noRank ? (
        <></>
      ) : (
        <View style={{ marginRight: "5%" }}>
          <AppBoldText size={2}>{rank}등</AppBoldText>
        </View>
      )}
      <View style={styles.infoBox}>
        <View style={styles.profileImgBox}>
          <Image
            source={user.profileImg ? { uri: user.profileImg } : { uri: defaultImageUri }}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.bedgeImgBox}>
          <Image source={src} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
        </View>
        <View style={{ width: "40%", marginRight: RFPercentage(1) }}>
          <AppBoldText pxSize={24} lineNumber={1}>
            {user.nickname}
          </AppBoldText>
        </View>
        {noRank ? (
          <></>
        ) : (
          <AppBoldText color={"orange"} pxSize={18}>
            {Math.round((user.datetimeList.length / wholeDay) * 100)}%
          </AppBoldText>
        )}
      </View>
    </View>
  )
}
export default RankUserItem

const styles = StyleSheet.create({
  rootScreen: {
    width: "100%",
    paddingVertical: "3%",
    flexDirection: "row",
    alignItems: "center",
  },
  infoBox: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: RFPercentage(8),
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    alignItems: "center",
  },
  profileImgBox: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    padding: "2%",
  },
  bedgeImgBox: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    marginLeft: RFPercentage(1),
    marginRight: RFPercentage(2),
  },
})
