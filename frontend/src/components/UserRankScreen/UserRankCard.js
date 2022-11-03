import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Text, View, Dimensions, Image, TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"

const { width: dw, height: dh } = Dimensions.get("window")

const WholeFrame = styled.View`
  background-color: rgba(255, 255, 255, 1);
  align-items: center;
  flex-direction: row;
  height: ${(dw * 0.85 * 2) / 10}px;
  margin-bottom: 10px;
  flex: auto;
  overflow: hidden;
  border-radius: 10px;
`

export default function UserRankCard() {
  const navigation = useNavigation()
  function editPressHandler(num) {
    navigation.push("UserBadge", { num })
  }
  return (
    <View>
      {/* ----------------------- 내 랭크 정보 ---------------------------------------------------------------------*/}
      <TouchableOpacity
        onPress={() => {
          editPressHandler(122)
        }}
      >
        <MyRankView>
          <WholeFrame>
            <View flex={2} justifyContent="center" alignItems="center">
              <AppText>122</AppText>
            </View>
            <View flex={2}>
              <Image
                source={require("../../assets/profile/me2.jpg")}
                style={{ width: "90%", height: "90%", borderRadius: 50 }}
              />
            </View>
            <View flex={2} alignItems="center">
              <Image
                source={require("../../assets/images/heart-icon-2.png")}
                style={{ width: "60%", height: "60%" }}
              />
            </View>
            <View flex={3}>
              <AppText lineNumber={1}>Chanasdasdasdsdas</AppText>
            </View>
            <View flex={3} justifyContent="center">
              <AppText>123.5k</AppText>
            </View>
          </WholeFrame>
        </MyRankView>
      </TouchableOpacity>

      {/* ----------------------- 두 번째 ---------------------------------------------------------------------*/}
      <View style={{ flexDirection: "row" }}>
        <WholeFrame>
          <View justifyContent="center" alignItems="center" style={{ width: "15%" }}>
            <AppText>7</AppText>
          </View>
          <View flex={2}>
            <Image
              source={require("../../assets/profile/me2.jpg")}
              style={{ width: "90%", height: "90%", borderRadius: 10 }}
            />
          </View>
          <View flex={2} alignItems="center">
            <Image
              source={require("../../assets/images/heart-icon-2.png")}
              style={{ width: "60%", height: "60%" }}
            />
          </View>
          <View flex={3}>
            <AppText>Chan</AppText>
          </View>
          <View flex={3} justifyContent="center">
            <AppText>123.5k</AppText>
          </View>
        </WholeFrame>
      </View>
      {/* ----------------------- 두 번째 ---------------------------------------------------------------------*/}
      <View style={{ flexDirection: "row" }}>
        <WholeFrame>
          <View justifyContent="center" alignItems="center" style={{ width: "15%" }}>
            <AppText>8</AppText>
          </View>
          <View flex={2}>
            <Image
              source={require("../../assets/profile/me2.jpg")}
              style={{ width: "90%", height: "90%", borderRadius: 10 }}
            />
          </View>
          <View flex={2} alignItems="center">
            <Image
              source={require("../../assets/images/heart-icon-2.png")}
              style={{ width: "60%", height: "60%" }}
            />
          </View>
          <View flex={3}>
            <AppText>Chan</AppText>
          </View>
          <View flex={3} justifyContent="center">
            <AppText>123.5k</AppText>
          </View>
        </WholeFrame>
      </View>
      {/* ----------------------- 두 번째 ---------------------------------------------------------------------*/}
      <View style={{ flexDirection: "row" }}>
        <WholeFrame>
          <View justifyContent="center" alignItems="center" style={{ width: "15%" }}>
            <AppText>9</AppText>
          </View>
          <View flex={2}>
            <Image
              source={require("../../assets/profile/me2.jpg")}
              style={{ width: "90%", height: "90%", borderRadius: 10 }}
            />
          </View>
          <View flex={2} alignItems="center">
            <Image
              source={require("../../assets/images/heart-icon-2.png")}
              style={{ width: "60%", height: "60%" }}
            />
          </View>
          <View flex={3}>
            <AppText>Chan</AppText>
          </View>
          <View flex={3} justifyContent="center">
            <AppText>123.5k</AppText>
          </View>
        </WholeFrame>
      </View>

      {/* 마지막 */}
    </View>
  )
}

const MyRankView = styled.View`
  display: flex;
  flex-direction: row;
`
