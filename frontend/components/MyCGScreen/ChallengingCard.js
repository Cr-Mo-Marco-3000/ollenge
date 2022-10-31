import React from "react-native"
import { View, Text, Dimensions } from "react-native"
import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import AppCard from "../common/AppCard"
import { ProgressBar } from "react-native-paper"
import { ExampleIcon, RunningIcon } from "../../assets/images/MyCGScreen/MyCGScreen"

export default function ChallengingCard(props) {
  const windowWidth = Dimensions.get("window").width
  const isChallenge = props.challengeInfo.isChallenge
  const title = props.challengeInfo.title
  const teamName = props.challengeInfo.teamName
  const memberNumber = props.challengeInfo.memberNumber
  const progress = props.challengeInfo.progress
  const startDate = props.challengeInfo.startDate
  const endDate = props.challengeInfo.endDate
  return (
    <View
      style={{
        backgroundColor: "#edf8ff",
        height: parseInt(200),
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 200 * 0.9,
          width: "90%",
        }}
      >
        <AppCard>
          {/* 상단  */}
          <View
            style={{
              flex: 7,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            {/* 전체 넓이 지정 View */}
            <View
              style={{
                height: "95%",
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
                    borderRadius: 200 * 0.7 * 0.95 * 0.9,
                    width: 200 * 0.7 * 0.95 * 0.9 + 2,
                    height: 200 * 0.7 * 0.95 * 0.9 + 2,
                    zIndex: 10,
                    elevation: 7,
                  }}
                >
                  {/* 나중에 여기에도 예시파일처럼 직접 borderRadius 먹여주어야 함 */}
                  <ExampleIcon />
                </View>
                {/* 사진 옆 뿔 */}
                <View
                  style={{
                    backgroundColor: "#80A7B3",
                    position: "absolute",
                    width: windowWidth * 0.8 - 200 * 0.7 * 0.95 * 0.9 * 0.5,
                    borderRightRadius: 200 * 0.7 * 0.95 * 0.9 * 0.4,
                    borderBottomRightRadius: 200 * 0.7 * 0.95 * 0.9 * 0.4,
                    borderTopRightRadius: 200 * 0.7 * 0.95 * 0.9 * 0.4,
                    left: 200 * 0.7 * 0.95 * 0.9 * 0.5,
                    height: 200 * 0.7 * 0.95 * 0.9 * 0.4,
                    zIndex: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  {/* 뿔 안 글자 */}
                  <View
                    style={{
                      position: "absolute",
                      left: (200 * 0.7 * 0.95 * 0.9) / 2,
                      right: 10,
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AppBoldText>하루 3잔 물마시기</AppBoldText>
                  </View>
                </View>
              </View>
              {/* 오른쪽 */}
              <View
                style={{
                  flex: 6,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 200 * 0.7 * 0.95 * 0.9 * 0.4,
                    height: 200 * 0.7 * 0.95 * 0.9 * 0.6,
                    left: 0,
                    right: 0,
                    // backgroundColor: "red",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <AppText>{teamName}</AppText>
                    <View
                      style={{
                        width: 200 * 0.7 * 0.95 * 0.9 * 0.6 * 0.4,
                        height: 200 * 0.7 * 0.95 * 0.9 * 0.6 * 0.4,
                        borderRadius: 200 * 0.7 * 0.95 * 0.9 * 0.6 * 0.4,
                        marginLeft: 5,
                        backgroundColor: "#FCBE32",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <AppText>{memberNumber}</AppText>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* 하단 */}
          <View
            style={{
              flex: 3,
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  width: windowWidth * 0.8,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    fontFamily: "HyeminRegular",
                    color: ColorSet.navyColor(1),
                  }}
                >
                  {startDate}
                </Text>
                <View
                  style={{
                    position: "absolute",
                    width: windowWidth * 0.8,
                    height: 17,
                    // backgroundColor: "red",
                  }}
                >
                  {progress > 20 && progress < 80 ? (
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        left: (windowWidth * 0.8 * progress) / 100 - 15,
                        bottom: 5,
                      }}
                    >
                      <RunningIcon
                        style={{
                          position: "absolute",
                        }}
                      />
                    </View>
                  ) : null}
                </View>

                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    fontFamily: "HyeminRegular",
                    color: ColorSet.navyColor(1),
                  }}
                >
                  {endDate}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                width: windowWidth * 0.8,
              }}
            >
              <ProgressBar style={{}} progress={progress / 100} color={ColorSet.orangeColor(1)} />
            </View>
          </View>
        </AppCard>
      </View>
    </View>
  )
}
