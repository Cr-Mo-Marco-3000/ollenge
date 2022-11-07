import React, { useEffect, useState } from "react"
import { Text } from "react-native"
import PageBase, { fontStyles } from "./PageBase"
import ImagePicker from "../common/ImagePicker"
import TextInputContainer from "../common/TextInputContainer"

export default function Page1({ info, setInfo }) {
  const [name, setName] = useState(info.challengeName)
  useEffect(() => {
    setInfo(() => {
      return { ...info, challengeName: name }
    })
  }, [name, setName])
  return (
    <PageBase toNext={"Page2"}>
      <ImagePicker />
      <Text style={frameStyles.inputArea}>팀 이름</Text>
      <TextInputContainer inputText={name} inputHandler={setName} />
    </PageBase>
  )
}

const frameStyles = {
  inputArea: {
    ...fontStyles.HyeminBold({ size: 12 }),
    textAlign: "center",
  },
}
