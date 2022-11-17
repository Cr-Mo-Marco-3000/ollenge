import React from "react"

import { Image, StyleSheet, View } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"

import AppBoldText from "../../common/AppBoldText"
import defaultImage from "../../../assets/images/default-image.png"
import ColorSet from "../../../style/ColorSet"

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
          {src ? (
            <Image source={src} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
          ) : (
            <View
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
                backgroundColor: `${ColorSet.grayColor(1)}`,
              }}
            />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <AppBoldText size={2.5} lineNumber={1}>
            {user.nickname}
          </AppBoldText>
        </View>
        {noRank ? (
          <></>
        ) : (
          <AppBoldText color={"orange"} size={2.3}>
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
    paddingBottom: "3%",
    flexDirection: "row",
    alignItems: "center",
  },
  infoBox: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: RFPercentage(9),
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
    paddingHorizontal: "2%",
  },
  profileImgBox: {
    width: RFPercentage(9),
    height: RFPercentage(9),
    padding: "2%",
  },
  bedgeImgBox: {
    padding: "2%",
    width: RFPercentage(9),
    height: RFPercentage(9),
  },
})
