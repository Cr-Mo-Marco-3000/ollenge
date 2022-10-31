import React from "react"

import { TextInput, StyleSheet } from "react-native"
import styled from "styled-components/native"
import { RFPercentage } from "react-native-responsive-fontsize"
import { useState } from "react"

import AppText from "./AppText"

function TextInputContainer({ inputText, inputHandler }) {
  const [inputErrorText, setInputErrorText] = useState("2~12자, 특수문자 사용 금지")
  return (
    <RootScreen>
      <TextInput
        value={inputText}
        style={styles.textInputBox}
        maxLength={12}
        onChangeText={inputHandler}
      />
      <AppText color={"deepOrange"} size={2}>
        {inputErrorText}
      </AppText>
    </RootScreen>
  )
}
export default TextInputContainer

const styles = StyleSheet.create({
  textInputBox: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "80%",
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

const RootScreen = styled.View`
  align-items: center;
  width: 100%;
  height: 200px;
`
