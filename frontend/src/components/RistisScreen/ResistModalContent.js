import React, { useContext } from "react"

import { Alert, Image, Pressable, StyleSheet, View } from "react-native"
import AppText from "../common/AppText"
import AppButton from "../common/AppButton"
import { RFPercentage } from "react-native-responsive-fontsize"
import { useNavigation } from "@react-navigation/native"

import { AuthorizationInstance } from "../../api/settings"

function ResistModalContent({ uri, base64, challengeId, resetCamera, showResistModal }) {
  const instance = AuthorizationInstance()
  const navigation = useNavigation()

  const registAuthImg = async () => {
    const dataForm = { challenge_id: challengeId, std_img: base64 }
    await instance
      .post("/auth/stdimg", dataForm, {})
      .then((res) => {
        navigation.goBack("CGRoom")
        showResistModal()
      })
      .catch((err) => {
        const errcode = err.response.data.errcode
        console.log(errcode)
        console.log(err.response.data.message)
        if (errcode === 0) {
          Alert.alert("이미 기준 사진이 존재 합니다.")
        } else if (errcode === 1) {
          Alert.alert("입력이 바르지 않습니다")
        } else if (errcode === 2) {
          Alert.alert("사진이 업로드 되지 않습니다.") //S3 문제
        } else if (errcode === 3) {
          Alert.alert("인증되지 않은 유저입니다.") // auth Token  문제
        } else if (errcode === 4) {
          Alert.alert("챌린지에 참여한 인원이 아닙니다.")
        } else if (errcode === 5) {
          Alert.alert("인터넷 접속이 불량합니다.") // DB 접속 불량
        } else if (errcode === 6) {
          Alert.alert("인증 시간이 아닙니다.") //이게 왜 있지
        } else if (errcode === 7) {
          Alert.alert("특징점이 너무 적습니다.")
        }
        navigation.goBack("CGRoom")
      })
  }

  return (
    <View style={{ paddingHorizontal: "5%" }}>
      <View style={styles.imgBox}>
        <Image
          source={{ uri: uri }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%", borderRadius: 20 }}
        />
      </View>
      <Pressable style={styles.cameraBtn} onPress={resetCamera}>
        <AppText>다시 찍기</AppText>
      </Pressable>
      <View style={styles.resistBtn}>
        <AppButton
          title={"인증 이미지 제출"}
          backColor={"navy"}
          handler={registAuthImg}
        ></AppButton>
      </View>
    </View>
  )
}
export default ResistModalContent

const styles = StyleSheet.create({
  imgBox: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
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
  cameraBtn: {
    marginTop: "5%",
    marginBottom: "10%",
  },
  resistBtn: {
    width: "100%",
    height: RFPercentage(7),
  },
})
