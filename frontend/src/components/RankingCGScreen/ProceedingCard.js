import React from "react-native"
import { View, Dimensions, Image } from "react-native"

import AppBoldText from "../common/AppBoldText"
import AppCard from "../common/AppCard"

import styled from "styled-components"

export default function ProceedingCard(props) {
  const windowWidth = Dimensions.get("window").width
  // 카드 정보
  const startDate = props.startDate.replace(/-/g, ".").slice(2)
  const endDate = props.endDate.replace(/-/g, ".").slice(2)
  const challengeInfo = props.challengeInfo

  const presetTopic = challengeInfo.presetTopic
  const presetImg = challengeInfo.presetImg

  // 레이아웃 정보
  const spaceHeight = 180
  const cardHeight = spaceHeight * 0.9

  // 카드 높이 * 70%(상단높이) * 상단높이 위쪽 깎기 * 보다 약간 작게
  // const circleHeightWidth = 200 * 0.7 * 0.95 * 0.75
  const pxSize = windowWidth * 0.05
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
                    {startDate} - {endDate} (2주)
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
                  {/* 버튼 자체 => styled component */}
                  {/* <Button
                    style={{
                      backgroundColor: ColorSet.navyColor(1),
                    }}
                  > */}
                  {/* 버튼 내부 공간, 양 50%공간으로 쪼갬 */}
                  {/* <ButtonInner> */}
                  {/* 아이콘 들어가는 공간 */}
                  {/* <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: "50%",
                        }}
                      >
                        <BoyIcon />
                      </View> */}
                  {/* ~명 들어가는 공간 */}
                  {/* <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: "50%",
                          right: 3,
                        }}
                      >
                        <AppBoldText color="white" pxSize={65 * 0.2}>
                          {peopleNumber}
                        </AppBoldText>
                      </View>
                    </ButtonInner>
                  </Button> */}
                  {/* {isParticipated && (
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
                        <AppBoldText color="white" pxSize={65 * 0.2}>
                          참여 중
                        </AppBoldText>
                      </ButtonInner>
                    </Button>
                  )} */}
                </TextRow>
              </View>
            </View>
            {/* 오른쪽 => 이미지만 들어갈곳 */}
            {/* 각 이미지는, 사이즈 설정을 다르게 해야 해서, 이미지 모듈 파일에서 직접 조정 */}
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
                {/* {presetObject[challengePresetID]()} */}
                <Image source={{ uri: presetImg }}></Image>
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
