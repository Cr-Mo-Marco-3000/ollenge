import React from "react"

import { View, Image, StyleSheet } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"

import defaultImage from "../../assets/images/default-image.png"
import ColorSet from "../../style/ColorSet"

function ProfileBedge({ url, isActive }) {
  const defaultImageUri = Image.resolveAssetSource(defaultImage).uri
  return (
    <View style={isActive ? [styles.imgBox, styles.activeBorder] : [styles.imgBox, styles.border]}>
      <Image
        source={url ? { uri: url } : { uri: defaultImageUri }}
        style={{ width: "100%", height: "100%", borderRadius: 100 }}
        resizeMode="cover"
      />
    </View>
  )
}
export default ProfileBedge

const styles = StyleSheet.create({
  imgBox: {
    width: RFPercentage(7),
    height: RFPercentage(7),
    borderRadius: 100,
    marginRight: RFPercentage(1),
  },
  activeBorder: {
    borderColor: "#1fd184",
    borderWidth: 3,
    shadowColor: `${ColorSet.yellowColor(1)}`,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5.65,

    elevation: 5,
  },
  border: {
    borderColor: `${ColorSet.grayColor(1)}`,
    borderWidth: 3,
  },
})
