import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import DeviceInfo from "../../style/DeviceInfo"
import styled from "styled-components/native"

const { dw, dh } = DeviceInfo

const cw = (dw * 4.5) / 6

const Case = styled.View`
  width: ${cw};
  height: ${cw};
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`

const BadgeBox = styled.View`
  width: ${cw / 3}px;
  height: ${cw / 3}px;
  border: 0.5px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
`

const Cover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(217, 217, 217, 0.8);
  z-index: 30;
`

export default function UserBadgeList() {
  return (
    <Case>
      <View style={{ flexDirection: "row" }}>
        <BadgeBox>
          <Cover></Cover>
          <Image
            source={require("../../assets/images/heart-icon-1.png")}
            style={{ width: "80%", height: "80%" }}
          />
        </BadgeBox>
        <BadgeBox>
          <Image
            source={require("../../assets/images/heart-icon-2.png")}
            style={{ width: "80%", height: "80%" }}
          />
        </BadgeBox>
        <BadgeBox>
          <Image
            source={require("../../assets/images/heart-icon-1.png")}
            style={{ width: "80%", height: "80%" }}
          />
        </BadgeBox>
      </View>
      <View style={{ flexDirection: "row" }}>
        <BadgeBox>
          <Image
            source={require("../../assets/images/heart-icon-1.png")}
            style={{ width: "80%", height: "80%" }}
          />
        </BadgeBox>
        <BadgeBox>
          <Image
            source={require("../../assets/images/heart-icon-1.png")}
            style={{ width: "80%", height: "80%" }}
          />
        </BadgeBox>
        <BadgeBox>
          <Image
            source={require("../../assets/images/heart-icon-1.png")}
            style={{ width: "80%", height: "80%" }}
          />
        </BadgeBox>
      </View>
      <View style={{ flexDirection: "row" }}>
        <BadgeBox>
          <Image
            source={require("../../assets/images/heart-icon-1.png")}
            style={{ width: "80%", height: "80%" }}
          />
        </BadgeBox>
        <BadgeBox>
          <Image
            source={require("../../assets/images/heart-icon-1.png")}
            style={{ width: "80%", height: "80%" }}
          />
        </BadgeBox>
        <BadgeBox>
          <Image
            source={require("../../assets/images/heart-icon-1.png")}
            style={{ width: "80%", height: "80%" }}
          />
        </BadgeBox>
      </View>
    </Case>
  )
}
