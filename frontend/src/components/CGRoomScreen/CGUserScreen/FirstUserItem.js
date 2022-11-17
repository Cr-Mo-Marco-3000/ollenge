import { LinearGradient } from "expo-linear-gradient"
import React from "react"

import { Image, StyleSheet, View } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"

import { CrownIcon } from "../../../assets/images"
import defaultImage from "../../../assets/images/default-image.png"
import ColorSet from "../../../style/ColorSet"
import AppBoldText from "../../common/AppBoldText"

function FirtstUserItem({ user, wholeDay, src }) {
  const defaultImageUri = Image.resolveAssetSource(defaultImage).uri
  return (
    <View style={styles.itemContainer}>
      <View style={styles.crownImg}>
        <CrownIcon />
      </View>
      <View style={styles.infoContainer}>
        <LinearGradient
          style={{ flex: 1, borderRadius: 20, alignItems: "center", justifyContent: "center" }}
          colors={["#FCC8AB", `${ColorSet.yellowColor(1)}`]}
        >
          <View style={styles.imgBox}>
            <View style={styles.profileImgBox}>
              <Image
                source={user.profileImg ? { uri: user.profileImg } : { uri: defaultImageUri }}
                style={{ width: "100%", height: "100%", borderRadius: 10 }}
                resizeMode="cover"
              />
            </View>
            {src ? (
              <View style={styles.bedgeBox}>
                <View style={{ width: RFPercentage(4), height: RFPercentage(4) }}>
                  <Image
                    source={src}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
          <AppBoldText lineNumber={1} size={2.5}>
            {user.nickname}
          </AppBoldText>
          <AppBoldText color={"white"} size={2.3}>
            {Math.round((user.datetimeList.length / wholeDay) * 100)}%
          </AppBoldText>
        </LinearGradient>
      </View>
    </View>
  )
}
export default FirtstUserItem

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    marginBottom: "5%",
  },
  crownImg: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    marginBottom: RFPercentage(1),
  },
  infoContainer: {
    width: RFPercentage(18),
    height: RFPercentage(18),
    borderRadius: 20,
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
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: "5%",
  },
  profileImgBox: {
    width: RFPercentage(9),
    height: RFPercentage(9),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bedgeBox: {
    width: RFPercentage(4),
    height: RFPercentage(6),
    backgroundColor: `${ColorSet.grayColor(0.8)}`,
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 10,
    position: "absolute",
    right: -RFPercentage(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
