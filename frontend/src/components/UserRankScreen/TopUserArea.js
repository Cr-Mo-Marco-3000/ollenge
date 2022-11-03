import React from "react"
import Styled from "styled-components/native"
import { Dimensions, Image } from "react-native"
import { Avatar } from "react-native-paper"
import AppText from "../common/AppText"

const dw = Dimensions.get("window").width
const dh = Dimensions.get("window").height

const WholeFrame = Styled.View`
  width: 100%;
  height: ${dh * 0.45}px;
  position : relative;
  margin-bottom: 24px;
  margin-top: 48px;
`

const cardWidth = dw * 0.37
const cardHeight = (cardWidth * 4) / 3

const FirstCard = Styled.View`
  width: ${cardWidth}px;
  z-index: 30
  position: absolute;
  left: 31%;
  top: -5%;
  align-items: center;
`

const SecondCard = Styled.View`
  width: ${cardWidth}px;
  position: absolute;
  bottom: 10%;
  align-items: center;
`

const ThirdCard = Styled.View`
  width: ${cardWidth}px;
  position: absolute;
  right: 0;
  bottom: 0;
  align-items: center;
`

const BdImage = Styled.View`
  width: ${cardWidth * 0.9}px;
  height: ${cardWidth * 0.9}px;
  overflow: hidden;
  border: 4px solid ${(props) => (props.color ? props.color : "black")};
  border-radius: 120px;
`

export default function TopUserArea() {
  return (
    <WholeFrame>
      <FirstCard>
        <Image source={require("../../assets/images/crown.png")} />
        <BdImage color="gold">
          <Image
            source={require("../../assets/profile/me1.jpg")}
            style={{ width: "100%", height: "100%", borderRadius: 25 }}
          />
        </BdImage>
        <AppText size={4}>Chan</AppText>
        <AppText size={3}>{(1235).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}점</AppText>
      </FirstCard>
      <SecondCard>
        <BdImage color="silver">
          <Image
            source={require("../../assets/profile/me2.jpg")}
            style={{ width: "100%", height: "100%", borderRadius: 25 }}
          />
        </BdImage>
        <AppText size={4}>Chan</AppText>
        <AppText size={3}>{(123551).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}점</AppText>
      </SecondCard>
      <ThirdCard>
        <BdImage color="brown">
          <Image
            source={require("../../assets/profile/me3.jpg")}
            style={{ width: "100%", height: "100%", borderRadius: 25 }}
          />
        </BdImage>
        <AppText size={4}>Chan</AppText>
        <AppText size={3}>{(123551).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}점</AppText>
      </ThirdCard>
    </WholeFrame>
  )
}
