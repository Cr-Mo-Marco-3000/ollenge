import React from "react-native"
import { View, Dimensions, Text } from "react-native"
import { Pressable } from "react-native"
import AppCard from "../common/AppCard"

AppText
import styled from "styled-components"
import { TriangleIcon } from "../../assets/images"
import { TriangleIcon2 } from "../../assets/images"
import AppBoldText from "../common/AppBoldText"
import AppText from "../common/AppText"
import AppButton from "../common/AppButton"
import * as Images from "../../assets/images/RankingCGScreen/RankingCGScreen.js"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

export default function ParticipatingDetailCard(props) {
  const index = props.index
  const arrayLength = props.arrayLength

  // const presetTopic = props.challengeInfo.presetTopic
  // const challengePresetID = props.challengeInfo.challengePresetID
  // const memberNumber = props.challengeInfo.memberNumber
  // const progress = props.challengeInfo.progress
  // const startDate = props.challengeInfo.startDate
  // const endDate = props.challengeInfo.endDate
  // const isParticipated = props.challengeInfo.isParticipated
  // const peopleNumber = props.challengeInfo.peopleNumber

  // const presetObject = {
  //   1: () => <Images.SunIcon left={-30} top={-20} />,
  //   2: () => <Images.NotebookIcon left={30} top={-10} />,
  //   3: () => <Images.GymIcon left={10} top={-50} />,
  // }

  return (
    <PageView>
      <CardView>
        {/* 좌측 화살표 */}
        <View
          style={{
            position: "absolute",
            width: screenWidth * 0.1 * 0.33,
            height: 20,
            top: 265,
            left: -(screenWidth * 0.1 * 0.66),
            opacity: 0.5,
          }}
        >
          {!(index === 0) && <TriangleIcon />}
        </View>
        <AppCard>
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "90%",
                height: "93%",
              }}
            >
              <View>
                <AppBoldText color="orange" pxSize={30}>
                  운동하기
                </AppBoldText>
              </View>
              <View
                style={{
                  left: 15,
                  marginTop: 10,
                }}
              >
                <View>
                  <AppBoldText pxSize={14}>건강한 생활을 위한 한 걸음</AppBoldText>
                  <AppBoldText pxSize={14}>매일 매일 운동한 내용을 인증해보세요!</AppBoldText>
                </View>
              </View>
              <View
                style={{
                  height: 240,
                  justifyContent: "center",
                }}
              >
                <DetailRow>
                  <RowIcon>
                    <Images.GreenSquareIcon />
                  </RowIcon>
                  <RowText>
                    <DetailUpperRow>
                      <AppText pxSize={13}>시작일</AppText>
                    </DetailUpperRow>
                    <DetailUnderRow>
                      <AppBoldText pxSize={15}>2022.10.31 (월)</AppBoldText>
                    </DetailUnderRow>
                  </RowText>
                </DetailRow>
                <DetailRow>
                  <RowIcon>
                    <Images.OrangeSquareIcon />
                  </RowIcon>
                  <RowText>
                    <DetailUpperRow>
                      <AppText pxSize={13}>종료일</AppText>
                    </DetailUpperRow>
                    <DetailUnderRow>
                      <AppBoldText pxSize={15}>2022.11.14 (일)</AppBoldText>
                    </DetailUnderRow>
                  </RowText>
                </DetailRow>
                <DetailRow>
                  <RowIcon>
                    <Images.CalendarIcon />
                  </RowIcon>
                  <RowText>
                    <DetailUpperRow>
                      <AppText pxSize={13}>기간</AppText>
                    </DetailUpperRow>
                    <DetailUnderRow>
                      <AppBoldText pxSize={15}>14일</AppBoldText>
                    </DetailUnderRow>
                  </RowText>
                </DetailRow>
                <DetailRow>
                  <RowIcon>
                    <Images.StopwatchIcon />
                  </RowIcon>
                  <RowText>
                    <DetailUpperRow>
                      <AppText pxSize={13}>인증 마감 시간</AppText>
                    </DetailUpperRow>
                    <DetailUnderRow>
                      <AppBoldText pxSize={15}>매일 오후 11시</AppBoldText>
                    </DetailUnderRow>
                  </RowText>
                </DetailRow>
              </View>
              <View
                style={{
                  height: 130,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flex: 2,
                  }}
                >
                  <AppBoldText pxSize={22}>인증 방식</AppBoldText>
                </View>
                <MethodRow>
                  <View
                    style={{
                      flex: 3,
                      width: "100%",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Images.HandIcon />
                    </View>
                    <View
                      style={{
                        flex: 8,
                        justifyContent: "center",
                      }}
                    >
                      <AppBoldText size={2}>사진 인증</AppBoldText>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 7,
                    }}
                  >
                    <AppText pxSize={17} align="left">
                      헬스 기구, 운동 용품 등을 사진을 통해 인식하여 당일 달성 여부를 판단합니다.
                    </AppText>
                  </View>
                </MethodRow>
              </View>
            </View>
            {/* 이미지 구획 */}
            <ImageView>
              {/* {presetObject[challengePresetID]()} */}
              <Images.SunIcon left={-30} top={-20} />
            </ImageView>
            {/* 버튼구획 */}
            <ButtonView>
              <View
                style={{
                  width: "90%",
                  height: "100%",
                  elevation: 9,
                }}
              >
                <AppButton title="챌린지 팀 만들기" />
              </View>
            </ButtonView>
          </View>
        </AppCard>
        {/* 우측 화살표 */}
        <View
          style={{
            position: "absolute",
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
  width: ${screenWidth}px;
  justify-content: center;
  align-items: center;
  bottom: ${(screenHeight * 0.1) / 2}px;
`

const CardView = styled.View`
  height: 550px;
  width: 80%;
`

const DetailRow = styled.View`
  height: 20%;
  width: ${screenWidth * 0.72 - 30}px;
  left: 15px;
  flex-direction: row;
  align-items: center;
`

const RowIcon = styled.View`
  height: 100%;
  width: ${screenWidth * 0.09}px;
`

const RowText = styled.View`
  left: 10px;
  justify-content: center;
`

const DetailUpperRow = styled.View`
  height: 30%;
  justify-content: center;
  align-items: flex-start;
`
const DetailUnderRow = styled.View`
  justify-content: center;
  height: 40%;
  top: 2px;
`

const ImageView = styled.View`
  position: absolute;
  width: 250px;
  height: 200px;
  align-items: flex-end;
  /* background-color: red; */
  bottom: 0;
  right: 0;
  overflow: hidden;
`

const MethodRow = styled.View`
  flex: 8;
  width: ${screenWidth * 0.72 - 30}px;
  left: 15px;
  justify-content: flex-start;
`

const ButtonView = styled.View`
  position: absolute;
  bottom: 5%;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
`
