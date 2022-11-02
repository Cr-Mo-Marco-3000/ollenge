import React from "react-native"
import { View, Text, Dimensions } from "react-native"
import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import AppCard from "../common/AppCard"
import {
  GymIcon,
  NotebookIcon,
  SunIcon,
  BoyIcon,
} from "../../assets/images/RankingCGScreen/RankingCGScreen"
import styled from "styled-components"

export default function ProceedingCard(props) {
  const windowWidth = Dimensions.get("window").width

  // 카드 정보
  const presetTopic = props.challengeInfo.presetTopic
  const challengePresetID = props.challengeInfo.challengePresetID
  const memberNumber = props.challengeInfo.memberNumber
  const progress = props.challengeInfo.progress
  const startDate = props.challengeInfo.startDate
  const endDate = props.challengeInfo.endDate
  const isParticipated = props.challengeInfo.isParticipated
  const peopleNumber = props.challengeInfo.peopleNumber
  const presetObject = {
    1: () => <SunIcon />,
    2: () => <NotebookIcon />,
    3: () => <GymIcon />,
  }
  // 레이아웃 정보
  const spaceHeight = 180
  const cardHeight = spaceHeight * 0.9

  // 카드 높이 * 70%(상단높이) * 상단높이 위쪽 깎기 * 보다 약간 작게
  // const circleHeightWidth = 200 * 0.7 * 0.95 * 0.75

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
        <AppCard>
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
                  <AppBoldText color="navy">{presetTopic}</AppBoldText>
                </TextRow>
                <TextRow
                  style={{
                    justifyContent: "center",
                    top: 5,
                  }}
                >
                  <AppBoldText size="15" color="navy">
                    {startDate} - {endDate}
                  </AppBoldText>
                </TextRow>
                {/* 얜 안씀 */}
                <TextRow></TextRow>
                <TextRow
                  style={{
                    position: "relative",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    left: -5,
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: ColorSet.navyColor(1),
                    }}
                  >
                    <ButtonInner>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: "50%",
                        }}
                      >
                        <BoyIcon />
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: "50%",
                          right: 3,
                        }}
                      >
                        <AppBoldText color="white" size={14}>
                          {peopleNumber}
                        </AppBoldText>
                      </View>
                    </ButtonInner>
                  </Button>
                  {isParticipated && (
                    <Button
                      style={{
                        backgroundColor: ColorSet.orangeColor(0.7),
                      }}
                    >
                      <ButtonInner
                        style={{
                          justifyContent: "center",
                        }}
                      >
                        <AppBoldText color="white" size={13}>
                          참여 중
                        </AppBoldText>
                      </ButtonInner>
                    </Button>
                  )}
                </TextRow>
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
                {presetObject[challengePresetID]()}
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

const Button = styled.View`
  width: 65px;
  border-radius: 20px;
  height: 100%;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
`

const ButtonInner = styled.View`
  width: 65%;
  height: 90%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`