import React from "react"
import { Text, View } from "react-native"
import Styled from "styled-components/native"
import { Dimensions } from "react-native"
import { Avatar } from "react-native-paper"

const dw = Dimensions.get("window").width
const dh = Dimensions.get("window").height

const WholeFrame = Styled.View`
  width: 100%;
  height: ${dh * 0.3}px;
  position : relative;
  margin-bottom: 24px;
`

const cardWidth = dw * 0.36
const cardHeight = (cardWidth * 4) / 3

const FirstCard = Styled.View`
  width: ${cardWidth}px;
  z-index: 30
  position: absolute;
  left: 33%;
`

const SecondCard = Styled.View`
  background-color: silver;
  width: ${cardWidth}px;
  height: ${cardHeight}px;

  position: absolute;
  left: 2%;
  bottom: 5%;
`

const ThirdCard = Styled.View`
  background-color: brown;
  width: ${cardWidth}px;
  height: ${cardHeight}px;

  position: absolute;
  right: 2%;
  bottom: 1%;
`

export default function TopUserArea() {
  return (
    <WholeFrame>
      <FirstCard>
        <Avatar.Image
          source={require("../../assets/profile/me1.jpg")}
          size={cardWidth}
          style={{ backgroundColor: "" }}
        />
        <Text numberOfLines={1}>ChanChanChanChanChanChanChanChanChan</Text>
        <Text numberOfLines={1}>
          {(1111111111111111).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}점
        </Text>
      </FirstCard>
      <SecondCard></SecondCard>
      <ThirdCard></ThirdCard>
    </WholeFrame>
  )
}
