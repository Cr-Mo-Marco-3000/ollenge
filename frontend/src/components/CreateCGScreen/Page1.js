import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import PageBase, { fontStyles } from "./PageBase"
import ImagePicker from "../common/ImagePicker"
import TextInputContainer from "../common/TextInputContainer"

export default function Page1({ info, setInfo }) {
  const [name, setName] = useState(info.challengeName)
  const [img, setImg] = useState(info.challengeImage)
  const [baseImg, setBaseImg] = useState("")

  useEffect(() => {
    setInfo(() => {
      return { ...info, challengeName: name }
    })
  }, [name, setName])
  return (
    <PageBase toNext={"Page2"}>
      <ImagePicker imageUri={img} imageUriHandler={setImg} imageBase64Handler={setBaseImg} />
      <View style={{ width: "100%" }}>
        <Text style={frameStyles.inputArea}>팀 이름</Text>
        <TextInputContainer inputText={name} inputHandler={setName} />
      </View>
    </PageBase>
  )
}

const frameStyles = {
  inputArea: {
    ...fontStyles.HyeminBold({ size: 7 }),
    textAlign: "center",
  },
}
