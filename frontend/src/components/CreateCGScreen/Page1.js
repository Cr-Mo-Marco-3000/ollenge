import React, { useEffect, useState } from "react"
import { KeyboardAvoidingView, Text, View } from "react-native"
import PageBase, { fontStyles } from "./PageBase"
import ImagePicker from "../common/ImagePicker"
import TextInputContainer from "../common/TextInputContainer"
import { dw, dh } from "../../style/DeviceInfo"

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
      <KeyboardAvoidingView
        style={{ width: "100%", flex: 1, justifyContent: "center" }}
        behavior="height"
      >
        <View style={{ width: "100%", flex: 1, justifyContent: "center" }}>
          <View style={{ flex: 1, marginBottom: dh * 0.1 }}>
            <ImagePicker imageUri={img} imageUriHandler={setImg} imageBase64Handler={setAwsUrl} />
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <Text style={frameStyles.inputArea}>팀 이름</Text>
            <View style={{ width: "100%" }}>
              <TextInputContainer inputText={name} inputHandler={setName} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </PageBase>
  )
}

const frameStyles = {
  inputArea: {
    ...fontStyles.HyeminBold({ size: 7 }),
    textAlign: "center",
  },
}
