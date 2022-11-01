import React from "react"

import { StyleSheet, View } from "react-native"
import styled from "styled-components"

import ColorSet from "../../style/ColorSet"

import AppBoldText from "../common/AppBoldText"
import GainedBedgeItem from "./GainedBedgeItem"
import NotGainedBedgeItem from "./NotGainedBedgeItem"
import WaitingBedgeItem from "./WaitingBedgeItem"

/* 
GainedBedgeItem : 이미 얻은 뱃지 (착용중인 경우 applied={true} 추가)
WaitingeBedgeItem: 취득 조건은 달성했으나 아직 획득하지 않은 것
NotGainedBedgeItem: 취득조건 미달성
*/
function BedgeCard() {
  return (
    <View style={styles.CardContainer}>
      <AppBoldText>뱃지 이름</AppBoldText>
      <BedgeBox>
        <GainedBedgeItem />
        <GainedBedgeItem applied={true} />
        <WaitingBedgeItem />
        <NotGainedBedgeItem />
      </BedgeBox>
    </View>
  )
}
export default BedgeCard

const styles = StyleSheet.create({
  CardContainer: {
    backgroundColor: `${ColorSet.paleBlueColor(1)}`,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})

const BedgeBox = styled.View`
  flex-direction: row;
  margin-top: 2%;
`
