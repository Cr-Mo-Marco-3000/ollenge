import React, { useEffect, useState } from "react"
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from "react-native"
import PageBase, { fontStyles } from "./PageBase"
import ImagePicker from "../common/ImagePicker"
import TextInputContainer from "../common/TextInputContainer"
import { dw, dh } from "../../style/DeviceInfo"
import ColorSet from "../../style/ColorSet"
import { RFPercentage } from "react-native-responsive-fontsize"
import { AuthorizationInstance } from "../../api/settings"

export default function Page1({ info, setInfo, toNext, cancelAll }) {
  const [name, setName] = useState(info.challengeName)
  const [img, setImg] = useState(info.challengeImg)
  const [baseFile, setBaseFile] = useState("")
  const [AwsUrl, setAwsUrl] = useState("")
  const [disabled, setDisabled] = useState(true)

  async function buttonHandler() {
    const instance = AuthorizationInstance()

    const data = new Object()
    // 프로필 이미지 등록
    if (baseFile !== "") {
      await instance
        .post("/auth/upload", { profile_img: baseFile }, {})
        .then((res) => {
          data.profileImg = `${res.data.profile_img}`
          setAwsUrl(data.profileImg)
          console.log("S3 URL: ", AwsUrl)
        })
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    if (img !== "") {
      buttonHandler()
    }
    setInfo(() => {
      return { ...info, challengeName: name, challengeImg: AwsUrl }
    })
  }, [name, setName, img, setAwsUrl])

  useEffect(() => {
    setDisabled(name.length < 2 || name.length > 12)
  }, [name, img, disabled, setDisabled])

  return (
    <PageBase toNext={toNext} disabled={disabled} cancelAll={cancelAll}>
      <Text style={frameStyles.titleText}>팀 정보 입력</Text>

      <KeyboardAvoidingView style={{ width: "100%", flex: 1 }} behavior="height">
        <View style={{ height: "100%", justifyContent: "center" }}>
          <View flex={3}>
            <ImagePicker imageUri={img} imageUriHandler={setImg} imageBase64Handler={setBaseFile} />
          </View>
          <View flex={2}>
            <Text style={frameStyles.inputArea}>팀 이름</Text>
            <TextInput style={styles.textInputBox} onChangeText={setName} value={name} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </PageBase>
  )
}

const frameStyles = {
  titleText: {
    ...fontStyles.HyeminBold({ size: 8 }),
    textAlign: "center",
    marginBottom: dh * 0.02,
  },

  inputArea: {
    ...fontStyles.HyeminBold({ size: 7 }),
    textAlign: "center",
  },
}

const styles = StyleSheet.create({
  textInputBox: {
    color: `${ColorSet.navyColor(1)}`,
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    height: RFPercentage(8),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    fontSize: RFPercentage(3),
    fontFamily: "HyeminRegular",
    paddingHorizontal: 10,
    marginBottom: "3%",
    marginTop: "5%",
  },
})
