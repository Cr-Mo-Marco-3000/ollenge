import React, { useState } from "react"
import { Image, View } from "react-native"
import TopMargin from "../common/TopMargin"
import { LinearGradient } from "expo-linear-gradient"
import ColorSet from "../../style/ColorSet"
import AppButton from "../common/AppButton"
import DeviceInfo from "../../style/DeviceInfo"
import AppText from "../common/AppText"
import TextInputContainer from "../common/TextInputContainer"
import { useNavigation } from "@react-navigation/native"

const { dw, dh } = DeviceInfo

export default function Page2({ info, setInfo }) {
  const { challengeName, challengeImg } = info
  const navigation = useNavigation()
  const [name, setName] = useState(challengeName)
  const [img, setImg] = useState(challengeImg)

  const toNext = () => {
    navigation.navigate("Page2")
  }
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[`${ColorSet.paleBlueColor(1)}`, `${ColorSet.yellowColor(1)}`]}
      end={{ x: 0, y: 1 }}
      locations={[0.8, 1]}
    >
      <View
        alignSelf="center"
        alignItems="center"
        justifyContent="center"
        style={{ width: "90%", height: "100%", position: "relative" }}
      >
        <TopMargin />
        <AppText>챌린지 팀 정보 설정</AppText>
        <Image source={{ uri: img }} style={{ width: dw * 0.8, height: dw * 0.8 }} />

        <AppText>챌린지 팀 이름</AppText>
        <TextInputContainer inputText={name} inputHandler={setName} />

        <View style={{ width: "100%", height: dh * 0.08 }}>
          <AppButton boldFlag="bold" title="다음" handler={toNext} />
        </View>
      </View>
    </LinearGradient>
  )
}
