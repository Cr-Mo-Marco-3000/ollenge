import React, { useEffect, useState } from "react"
import { KeyboardAvoidingView, Text, View } from "react-native"
import PageBase, { fontStyles } from "./PageBase"
import ImagePicker from "../common/ImagePicker"
import TextInputContainer from "../common/TextInputContainer"
import { dw, dh } from "../../style/DeviceInfo"
import ColorSet from "../../style/ColorSet"

export default function Page1({ info, setInfo, toNext, cancelAll }) {
  const [name, setName] = useState(info.challengeName)
  const [img, setImg] = useState(info.challengeImg)
  const [AwsUrl, setAwsUrl] = useState("")
  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    setInfo(() => {
      return { ...info, challengeName: name, challengeImg: AwsUrl }
    })
  }, [name, setName, AwsUrl, setAwsUrl])

  useEffect(() => {
    setDisabled(name.length < 2 || name.length > 12)
  }, [name, img, disabled, setDisabled])

  return (
    <PageBase toNext={toNext} disabled={disabled} cancelAll={cancelAll}>
      <Text style={frameStyles.titleText}>팀 정보 입력</Text>

      <KeyboardAvoidingView style={{ width: "100%", flex: 1 }} behavior="height">
        <View style={{ height: "100%", justifyContent: "center" }}>
          <View flex={3}>
            <ImagePicker imageUri={img} imageUriHandler={setImg} imageBase64Handler={setAwsUrl} />
          </View>
          <View flex={2}>
            <Text style={frameStyles.inputArea}>팀 이름</Text>
            <TextInputContainer inputText={name} inputHandler={setName} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </PageBase>
  )
}

const frameStyles = {
  titleText: {
    ...fontStyles.HyeminBold({ size: 9 }),
    textAlign: "center",
  },

  inputArea: {
    ...fontStyles.HyeminBold({ size: 7 }),
    textAlign: "center",
  },
}
