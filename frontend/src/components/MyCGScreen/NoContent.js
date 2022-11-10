import React from "react-native"
import styled from "styled-components"
import AppBoldText from "../common/AppBoldText"

const NoContent = (props) => {
  const message = props.message
  return (
    <AlterView>
      <AlterViewInside>
        <AlterInsideRow>
          <AppBoldText size={5}>텅!</AppBoldText>
        </AlterInsideRow>
        <AlterInsideRow>
          <AppBoldText size={3}>{props.message} 챌린지가 없습니다</AppBoldText>
          <AppBoldText size={3}>지금 바로 시작해 보세요!</AppBoldText>
        </AlterInsideRow>
      </AlterViewInside>
    </AlterView>
  )
}

const AlterView = styled.View`
  background-color: #edf8ff;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const AlterViewInside = styled.View`
  height: 130px;
  width: 80%;
  /* background-color: red; */
`

const AlterInsideRow = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default NoContent
