import React from "react-native"
import { View, Text, Dimensions, Image } from "react-native"
import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import AppCard from "../common/AppCard"

import styled from "styled-components"

export default function ParticipatingCard(props) {
  const windowWidth = Dimensions.get("window").width
  const challengeInfo = props.challengeInfo
  // 카드 정보
  const presetTopic = challengeInfo.presetTopic
  const presetImg = challengeInfo.presetImg

  const startDate = props.startDate.replace(/-/g, ".").slice(2)
  const endDate = props.endDate.replace(/-/g, ".").slice(2)
  // 레이아웃 정보
  const spaceHeight = 180
  const cardHeight = spaceHeight * 0.9
  const pxSize = windowWidth * 0.05
  // 카드 높이 * 70%(상단높이) * 상단높이 위쪽 깎기 * 보다 약간 작게
  // const circleHeightWidth = 200 * 0.7 * 0.95 * 0.75

  let startDateForCal = new Date(props.startDate).getTime()
  const nowDate = new Date().getTime()

  const dDate = Math.ceil((startDateForCal - nowDate) / 1000 / 60 / 60 / 24)

  const openAndClose = () => {
    props.openAndClose()
  }

  return (
    <View
      style={{
        backgroundColor: "#edf8ff",
        height: spaceHeight,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: cardHeight,
          width: "90%",
        }}
      >
        <AppCard func={openAndClose}>
          <View
            style={{
              flexDirection: "row",
              height: "100%",
              width: "100%",
            }}
          >
            {/* 왼쪽 => 글이 들어갈곳 */}
            <View
              style={{
                flex: 5,
                justifyContent: "center",
                left: 30,
              }}
            >
              <View
                style={{
                  height: "70%",
                }}
              >
                <TextRow
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <AppBoldText lineNumber={1} pxSize={pxSize} color="navy">
                    {presetTopic}
                  </AppBoldText>
                </TextRow>
                <TextRow
                  style={{
                    justifyContent: "center",
                    top: 5,
                  }}
                >
                  <AppBoldText pxSize={pxSize * 0.65} color="navy">
                    {startDate} - {endDate} (한달)
                  </AppBoldText>
                </TextRow>
                <TextRow
                  style={{
                    top: 7,
                  }}
                >
                  <AppBoldText color="orange">D-{dDate}</AppBoldText>
                </TextRow>
                <TextRow></TextRow>
              </View>
            </View>
            {/* 오른쪽 => 이미지만 들어갈곳 */}
            <View
              style={{
                flex: 5,
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <Image source={{ uri: presetImg }}></Image>
                {/* {presetObject[challengePresetID]()} */}
              </View>
            </View>
          </View>
        </AppCard>
      </View>
    </View>
  )
}

const TextRow = styled.View`
  height: 25%;
`
