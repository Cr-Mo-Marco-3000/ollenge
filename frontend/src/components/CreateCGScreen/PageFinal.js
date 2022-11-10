import React from "react"
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import ColorSet from "../../style/ColorSet"
import PageBase, { fontStyles } from "./PageBase"
import DeviceInfo from "../../style/DeviceInfo"

import { useNavigation } from "@react-navigation/native"
import apiSet from "../../api/index"
const { dw } = DeviceInfo
const topText = `챌린지 정보는 시작 이후 변경이${"\n"}불가하니 신중히 입력 부탁드립니다.`

const { challAPI } = apiSet

const WarnSign = () => {
  return (
    <View style={frameStyles.warnArea}>
      <View flex={3} style={frameStyles.warnLogo}>
        <Text style={fontStyles.HyeminBold({ size: 8 })}>!</Text>
      </View>
      <View flex={17} style={frameStyles.warnText}>
        <Text style={textStyles.warnText}>{topText}</Text>
      </View>
    </View>
  )
}

const Card = ({ title = "타이틀 없음", content = "컨텐츠 없음" }) => {
  return (
    <View style={frameStyles.cardArea}>
      <Text style={textStyles.cardTitle}>{title}</Text>
      <Text style={textStyles.cardContent}>{content}</Text>
    </View>
  )
}

/** ---------------------------- Eport Default 영역 ---------------------------- */
export default function Final({ info, isRank, toNext }) {
  const period = `${info.startDate} ~ ${info.endDate}`
  const timing = `${info.startTime} ~ ${info.endTime}`

  const CGInfo = {
    "팀 이름": [info.challengeName, "Page1"],
    "챌린지 내용": [info.challengeTopic, "Page2"],
    "인증 방식": [info.authType, "Page3"],
    "챌린지 설명": [info.challengeDescription, "Page4"],
    "챌린지 기간": [period, "Page5"],
    "인증 시간": [timing, "Page6"],
    보상: [info.rewardContent, "Page7"],
    벌칙: [info.penaltyContent, "Page7"],
  }
  const navigation = useNavigation()
  console.log("YES BABY", isRank)
  const checkCondition = (content) => {
    if (isRank === true) {
      if (
        content === "챌린지 내용" ||
        content === "인증 방식" ||
        content === "챌린지 기간" ||
        content === "인증 시간"
      ) {
        return true
      }
    }
    return false
  }
  const createChallenge = async () => {
    await challAPI.createCG(info)
  }

  return (
    <PageBase toNext={toNext} toSubmit={() => createChallenge()}>
      <View style={frameStyles.wholeArea}>
        <WarnSign />
        <ScrollView style={{ width: "100%", marginBottom: 24 }}>
          {Object.keys(CGInfo).map((key) => {
            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.8}
                disabled={checkCondition(key)}
                onPress={() => navigation.navigate(`${CGInfo[`${key}`][1]}`)}
              >
                <Card title={key} content={CGInfo[`${key}`][0]} />
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    </PageBase>
  )
}

const frameStyles = StyleSheet.create({
  wholeArea: {
    width: "100%",
    flex: 1,
  },

  warnArea: {
    backgroundColor: "rgb(252,190,50)",
    flexDirection: "row",
    marginBottom: 12,
    borderRadius: 6,
    elevation: 10,
    paddingTop: 6,
    paddingBottom: 6,
  },

  warnLogo: {
    height: dw * ((3 * 0.92) / 20),
    alignItems: "center",
    justifyContent: "center",
  },

  warnText: {
    justifyContent: "center",
    padding: 6,
  },

  cardArea: {
    width: "100%",
    borderRadius: 6,
    padding: dw * 0.04,
    marginBottom: 12,
    backgroundColor: "rgb(255, 255, 255)",
    elevation: 3,
  },
})

const textStyles = StyleSheet.create({
  warnText: { ...fontStyles.HyeminBold({ size: 4, color: `${ColorSet.navyColor(1)}` }) },

  cardTitle: {
    ...fontStyles.HyeminBold({ size: 6, color: `${ColorSet.navyColor(1)}`, bold: "bold" }),
    textAlign: "left",
    marginBottom: 6,
  },

  cardContent: {
    ...fontStyles.Hyemin({ size: 5, color: `${ColorSet.navyColor(1)}` }),
    textAlign: "left",
  },
})
