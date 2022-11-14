import React from "react-native"
import { View, Modal, Dimensions } from "react-native"
import styled from "styled-components"
import ColorSet from "../../style/ColorSet"
import { TriangleIcon } from "../../assets/images"
import AppBoldText from "./AppBoldText"
import TopMargin from "./TopMargin"
import { AntDesign } from "@expo/vector-icons"
/*

backgroundColor prop으로 배경색을,

title prop으로, 맨 위에 표시될 단어를 넣습니다.

*/

export default function AppModal(props) {
  const goBack = () => {
    props.openAndClose()
  }
  const isTransparent = props.isTransparent ? props.isTransparent : false
  const backgroundColor = props.backgroundColor ? props.backgroundColor : ColorSet.paleBlueColor(1)

  const title = props.title

  return (
    <Modal animationType="fade" statusBarTranslucent={true} transparent={isTransparent}>
      <View
        style={{
          backgroundColor: backgroundColor,
          flex: 1,
          // justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            flex: 0.5,
          }}
        ></View>
        <View
          style={{
            flex: 9.5,
          }}
        >
          <GoBackDiv>
            <TriColumn1>
              <GoBackButton onPress={goBack}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </GoBackButton>
            </TriColumn1>
            <TriColumn2>
              <AppBoldText pxSize={20}>{title}</AppBoldText>
              {/* <AppBoldText pxSize={20}>찬호와 아이들</AppBoldText> */}
            </TriColumn2>
            <TriColumn3></TriColumn3>
          </GoBackDiv>
          <ChildrenDiv>{props.children}</ChildrenDiv>
        </View>
      </View>
    </Modal>
  )
}
const buttonSize = 40

const windowHeight = Dimensions.get("window").height

const GoBackDiv = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  height: 50px;
`

const TriColumn = styled.View`
  justify-content: center;
`

const TriColumn1 = styled(TriColumn)`
  width: 20%;
  align-items: flex-start;
`
const TriColumn2 = styled(TriColumn)`
  width: 60%;
  top: 3px;
  align-items: center;
`

const TriColumn3 = styled(TriColumn)`
  width: 20%;
`

const GoBackButton = styled.Pressable`
  width: 20px;
  height: 20px;
  left: 30px;
`

const ChildrenDiv = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  padding-bottom: 70px;
`
