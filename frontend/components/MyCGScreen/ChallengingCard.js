import React from "react-native"
import { View, Text, Dimensions } from "react-native"
import ColorSet from "../../style/ColorSet"
import AppText from "../common/AppText"
import AppCard from "../common/AppCard"
import { ProgressBar } from "react-native-paper"
import { RunningIcon } from "../../assets/images/MyCGScreen/MyCGScreen"

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
    <AppCard height="200">
      {/* 상단  */}
      <View
        style={{
          flex: 7,
        }}
      ></View>
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
  )
}
