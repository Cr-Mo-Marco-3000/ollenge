import React from "react-native"
import { View, TStyleSheet, Modal, Dimensions } from "react-native"
import TopMargin from "../common/TopMargin"
import { Pressable } from "react-native"
import styled from "styled-components"
import { StatusBar } from "expo-status-bar"
import ColorSet from "../../style/ColorSet"
import { TriangleIcon } from "../../assets/images"

export default function AppModal(props) {
  const goBack = () => {
    props.openAndClose()
  }

  const backgroundColor = props.backgroundColor ? props.backgroundColor : ColorSet.paleBlueColor(1)

  return (
    <Modal statusBarTranslucent={true}>
      <View
        style={{
          backgroundColor: backgroundColor,
          flex: 1,
        }}
      >
        <GoBackDiv>
          <GoBackButton onPress={goBack}>
            <TriangleIcon />
          </GoBackButton>
        </GoBackDiv>
        <ChildrenDiv>{props.children}</ChildrenDiv>
      </View>
    </Modal>
  )
}

const GoBackDiv = styled.View`
  flex: 1;
  width: 100%;
`

const buttonSize = 40
const GoBackButton = styled.Pressable`
  width: ${buttonSize / 3 + 5}px;
  height: ${buttonSize / 3 + 10}px;
  position: absolute;
  top: 50px;
  left: 30px;
`

const ChildrenDiv = styled.View`
  flex: 9;
  width: 100%;
`
