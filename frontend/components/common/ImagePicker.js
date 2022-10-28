import React from "react"

import { View, Image, StyleSheet, Pressable, Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useState } from "react"
import defaultImage from "../../assets/images/default-image.png"
import { RFPercentage } from "react-native-responsive-fontsize"
import { LinearGradient } from "expo-linear-gradient"
import styled from "styled-components"

import ColorSet from "../../style/ColorSet"
import { PlusIcon } from "../../assets/images"

function ImagePickerContainer() {
  const defaultImageUri = Image.resolveAssetSource(defaultImage).uri
  const [image, setImage] = useState(defaultImageUri)
  const photoHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const cameraHandler = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    if (permissionResult.granted == false) {
      alert("카메라 권한을 승인하지 않았습니다")
      return
    }

    const result = await ImagePicker.launchCameraAsync()
    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const defaultHandler = () => {
    setImage(defaultImageUri)
  }
  function pressHandler() {
    Alert.alert(
      "프로필 이미지 선택",
      "",
      [
        { text: "라이브러리에서 선택", onPress: photoHandler },
        { text: "사진 찍기", onPress: cameraHandler },
        { text: "기본 이미지로 변경", onPress: defaultHandler },
        { text: "취소" },
      ],
      { cancelable: true },
    )
  }
  return (
    <RootScreen>
      <View style={styles.imageContainer}>
        <Image style={styles.profileImage} source={{ uri: image }} resizeMode="cover" />
      </View>
      <Pressable style={styles.editButton} onPress={pressHandler}>
        <LinearGradient
          colors={[`${ColorSet.orangeColor(100)}`, `${ColorSet.yellowColor(100)}`]}
          style={{
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <PlusIcon />
        </LinearGradient>
      </Pressable>
    </RootScreen>
  )
}
export default ImagePickerContainer

const styles = StyleSheet.create({
  imageContainer: {
    width: RFPercentage(31),
    height: RFPercentage(31),
    borderRadius: 200,
    elevation: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.38,
    shadowRadius: 12.0,
    marginTop: "10%",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "blue",
    borderRadius: 200,
  },
  editButton: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    borderRadius: 100,
    elevation: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.38,
    shadowRadius: 12.0,
    marginTop: "10%",
    position: "relative",
    bottom: RFPercentage(14),
    left: RFPercentage(11),
  },
})

const RootScreen = styled.View`
  align-items: center;
  justify-content: center;
`
