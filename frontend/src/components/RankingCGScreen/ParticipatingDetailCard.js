import React from "react-native"
import { View, Text, StyleSheet, Modal, Dimensions, ScrollView } from "react-native"
import TopMargin from "../common/TopMargin"
import { Pressable } from "react-native"
import AppCard from "../common/AppCard"
import styled from "styled-components"
import { TriangleIcon } from "../../assets/images"
import { TriangleIcon2 } from "../../assets/images"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

export default function ParticipatingDetailCard(props) {
  const index = props.index
  const arrayLength = props.arrayLength
  return (
    <PageView>
      <CardView>
        <View
          style={{
            position: "relative",
            width: screenWidth * 0.1 * 0.33,
            height: 20,
            top: 250,
            right: screenWidth * 0.1 * 0.66,
            opacity: 0.5,
          }}
        >
          {!(index === 0) && <TriangleIcon />}
        </View>
        <AppCard></AppCard>
        <View
          style={{
            position: "relative",
            width: screenWidth * 0.1 * 0.33,
            height: 20,
            bottom: 265,
            left: screenWidth * 0.8 + screenWidth * 0.1 * 0.33,
            opacity: 0.5,
          }}
        >
          {!(index === arrayLength - 1) && <TriangleIcon2 />}
        </View>
      </CardView>
    </PageView>
  )
}

const PageView = styled.View`
  width: ${screenWidth};
  justify-content: center;
  align-items: center;
  bottom: ${(screenHeight * 0.1) / 2};
`

const CardView = styled.View`
  height: 500px;
  width: 80%;
`
