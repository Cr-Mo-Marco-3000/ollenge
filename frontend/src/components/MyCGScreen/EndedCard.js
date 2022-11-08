import React from "react-native"
import { View, Text, Dimensions, Image } from "react-native"
import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import AppCard from "../common/AppCard"
import { ProgressBar } from "react-native-paper"
import { ExampleIcon, RunningIcon, CrownIcon } from "../../assets/images/MyCGScreen/MyCGScreen"

export default function EndedCard(props) {
  const windowWidth = Dimensions.get("window").width
  const isChallenge = props.challengeInfo.isChallenge
  const title = props.challengeInfo.title
  const teamName = props.challengeInfo.teamName
  const memberNumber = props.challengeInfo.memberNumber
  const progress = props.challengeInfo.progress
  const startDate = props.challengeInfo.startDate
  const endDate = props.challengeInfo.endDate
  // 카드 높이 * 70%(상단높이) * 상단높이 위쪽 깎기 * 보다 약간 작게
  const circleHeightWidth = 200 * 0.7 * 0.95 * 0.75
  return (
    <View
      style={{
        backgroundColor: "#edf8ff",
        height: parseInt(270),
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 270 * 0.9,
          width: "90%",
        }}
      >
        <AppCard>
          {/* 상단  */}
          <View
            style={{
              flex: 8.5,
              // backgroundColor: "red",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* 전체 넓이 지정 View */}
            <View
              style={{
                height: "85%",
                width: windowWidth * 0.8,
                flexDirection: "row",
              }}
            >
              {/* 왼쪽 */}
              <View
                style={{
                  flex: 4,
                }}
              >
                {/* 사진 들어가는 똥글뱅이 */}
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: circleHeightWidth,
                    // 카드 높이 * 70%(상단높이) * 상단높이 위쪽 깎기 * 보다 약간 작게
                    width: circleHeightWidth,
                    height: circleHeightWidth,
                    zIndex: 10,
                    elevation: 7,
                  }}
                >
                  {/* 나중에 여기에도 예시파일처럼 직접 borderRadius 먹여주어야 함 */}
                  <ExampleIcon />
                  {/* <Image
                    source={{ uri: challengeInfo.challengeImg }}
                    style={{ height: "100%", width: "100%", borderRadius: 200 * 0.7 * 0.95 * 0.75 }}
                    resizeMode="cover"
                  /> */}
                </View>
                {/* 사진 옆 뿔 */}
                <View
                  style={{
                    backgroundColor: "#80A7B3",
                    position: "absolute",
                    width: windowWidth * 0.8 - circleHeightWidth * 0.5,
                    borderRightRadius: circleHeightWidth * 0.4,
                    borderBottomRightRadius: circleHeightWidth * 0.4,
                    borderTopRightRadius: circleHeightWidth * 0.4,
                    left: circleHeightWidth * 0.5,
                    height: circleHeightWidth * 0.7,
                    zIndex: 5,
                    // justifyContent: "space-between",
                  }}
                >
                  {/* 뿔 안 글자 */}
                  <View
                    style={{
                      position: "absolute",
                      left: (200 * 0.7 * 0.95 * 0.75) / 2,
                      right: 10,
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        left: 8,
                      }}
                    >
                      <AppBoldText color="white">{title}</AppBoldText>
                    </View>
                    <View
                      style={{
                        left: 10,
                      }}
                    >
                      <AppBoldText size={2} color="white">
                        10.18 - 11.05
                      </AppBoldText>
                    </View>
                  </View>
                </View>
              </View>
              {/* 오른쪽 */}
              <View
                style={{
                  flex: 6,
                }}
              >
                {/* 그래프 부분 */}
                <View
                  style={{
                    position: "absolute",
                    top: 200 * 0.7 * 0.95 * 0.9 * 0.6,
                    height: 270 * 0.9 * 0.9 - circleHeightWidth,
                    width: windowWidth * 0.8 - circleHeightWidth,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "red",
                  }}
                >
                  {/* 내용 부분 */}
                  <View style={{ height: "80%", width: "100%" }}>
                    <View
                      style={{
                        width: "100%",
                        height: "25%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <AppBoldText size={2}>내 달성률</AppBoldText>
                      </View>
                      <View>
                        <AppBoldText size={2}>76%</AppBoldText>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: "25%",
                        justifyContent: "center",
                      }}
                    >
                      <ProgressBar
                        color={ColorSet.navyColor(1)}
                        style={{ height: 13 }}
                        progress={0.76}
                      />
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: "25%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <AppBoldText size={2}>팀 달성률</AppBoldText>
                      </View>
                      <View>
                        <AppBoldText size={2}>90%</AppBoldText>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: "25%",
                        justifyContent: "center",
                      }}
                    >
                      <ProgressBar
                        color={ColorSet.navyColor(1)}
                        style={{ height: 13 }}
                        progress={0.9}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* 하단 */}
          <View
            style={{
              flex: 1.5,
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  width: windowWidth * 0.8,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    bottom: 5,
                    marginRight: 5,
                  }}
                >
                  <CrownIcon />
                </View>
                <AppBoldText size={2} color="yellow">
                  전체 10팀 중 1등 달성!
                </AppBoldText>
              </View>
            </View>
          </View>
        </AppCard>
      </View>
    </View>
  )
}
