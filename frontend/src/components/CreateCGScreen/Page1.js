import React from "react"
import { Text } from "react-native"
import PageBase, { fontStyles } from "./PageBase"
import ImagePicker from "../common/ImagePicker"
import TextInputContainer from "../common/TextInputContainer"

export default function Page1() {
  return (
    <PageBase toNext={"Page2"}>
      <ImagePicker />
      <Text style={fontStyles.HyeminBold({ size: 12 })}>팀 이름</Text>
      <TextInputContainer />
    </PageBase>
  )
}
