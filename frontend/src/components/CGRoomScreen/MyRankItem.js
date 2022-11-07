import React from "react"

import { View, Image, StyleSheet } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"

import AppBoldText from "../common/AppBoldText"
import { HeartIcon1 } from "../../assets/images"
import defaultImage from "../../assets/images/default-image.png"

function MyRankItem({ user, rank }) {
  const defaultImageUri = Image.resolveAssetSource(defaultImage).uri
  return (
    <View style={styles.rootScreen}>
      <AppBoldText size={2}>{rank}</AppBoldText>
      <View style={styles.infoBox}>
        <View style={styles.profileImgBox}>
          <Image
            source={user.profileImg ? { url: user.profileImg } : { url: defaultImageUri }}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.bedgeImgBox}>
          <HeartIcon1 />
        </View>
        <View style={{ width: "40%", marginRight: RFPercentage(1) }}>
          <AppBoldText pxSize={24} lineNumber={1}>
            adsasdasdasd{user.nickname}
          </AppBoldText>
        </View>

        <AppBoldText color={"orange"} pxSize={18}>
          79%
        </AppBoldText>
      </View>
    </View>
  )
}
export default MyRankItem

const styles = StyleSheet.create({
  rootScreen: {
    width: "100%",
    paddingVertical: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  infoBox: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: RFPercentage(8),
    backgroundColor: "white",
    marginLeft: "5%",
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
    width: RFPercentage(7),
    height: RFPercentage(7),
  },
  bedgeImgBox: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    marginLeft: RFPercentage(1),
    marginRight: RFPercentage(2),
  },
})
