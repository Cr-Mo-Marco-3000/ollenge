import React, { useEffect, useState } from "react"
import { KeyboardAvoidingView, Pressable, ScrollView, Text, View } from "react-native"
import ColorSet from "../../style/ColorSet"
import { dw, dh } from "../../style/DeviceInfo"
import PageBase, { fontStyles } from "./PageBase"
import CustomTopicInput from "./CustomTopicInput"

const RankingCGs = ["아침 기상", "공부하기", "운동하기", "1일 1영양제", "1일 1샐러드", "정리정돈"]

const words = {
  TopTitle: "🍊 오랭지 목표 🍊",
  TopContent: `오랭지에서 지정한${"\n"}목표와 인증 방식을 사용합니다.`,

  BotTitle: "원하시는 미션이 없나요?",
  BotContent: "자유롭게 생성해보세요!",

  customContent: "클릭하여 작성하기",
}

export default function Page2({ info, setInfo }) {
  const [topic, setTopic] = useState(info.challengeTopic)
  const [clicked, setClicked] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [style, setStyle] = useState(0)

  useEffect(() => {
    setInfo((prev) => {
      return { ...prev, challengeTopic: topic }
    })
    setDisabled(topic === "")
  }, [topic, setTopic])

  useEffect(() => {
    setTopic(info.challengeTopic)
  }, [info, setTopic])

  /** 랭크 챌린지 토픽 카드 */
  const RankingCard = ({ title = "아직 지정 값 없음" }) => {
    return (
      <Pressable
        onPress={() => {
          setTopic(title)
        }}
        style={{
          ...frameStyles.rankingCard,
          backgroundColor: title === topic ? `${ColorSet.navyColor(1)}` : "white",
          // backgroundColor: title === topic ? `${ColorSet.navyColor(1)}` : "rgb(255, 191, 153)",
        }}
      >
        <Text
          style={{
            ...textStyles.rankingCard,
            color: title === topic ? "white" : `${ColorSet.navyColor(1)}`,
            // color: title === topic ? "white" : `${ColorSet.navyColor(1)}`,
          }}
        >
          {title}
        </Text>
      </Pressable>
    )
  }

  return (
    <PageBase toNext={"Page3"} disabled={disabled}>
      <KeyboardAvoidingView style={{ width: "100%", flex: 1 }} behavior="padding">
        {clicked === false && (
          <>
            {/* Choiced Topic */}
            <View flex={1} style={{ width: "100%", justifyContent: "center" }}>
              {/* <Text style={textStyles.Title}>선택한 목표{"\n"}</Text> */}
              <Text style={textStyles.Title}>{topic}</Text>
            </View>

            {/* Ranking CG Area */}
            <View style={{ width: "100%" }}>
              {/* <Text style={textStyles.TopTitle}>{words.TopTitle}</Text> */}
              <Text style={textStyles.TopContent}>{words.TopContent}</Text>
              <ScrollView style={frameStyles.rankingCGList} horizontal={true}>
                {RankingCGs.map((rcg, index) => {
                  return <RankingCard title={rcg} key={index} />
                })}
              </ScrollView>
            </View>

            {/* User CG Area */}
            <View flex={1} style={{ width: "100%", justifyContent: "center" }}>
              <View>
                <Text style={textStyles.BotTitle}>{words.BotTitle}</Text>
                <Text style={textStyles.BotContent}>{words.BotContent}</Text>
              </View>
              <Pressable onPress={() => setClicked(true)}>
                <View style={frameStyles.customArea}>
                  <Text style={textStyles.customArea}>{words.customContent}</Text>
                </View>
              </Pressable>
            </View>
          </>
        )}
        {clicked === true && (
          <>
            <CustomTopicInput topic={topic} setTopic={setTopic} setClicked={setClicked} />
          </>
        )}
      </KeyboardAvoidingView>
    </PageBase>
  )
}

const frameStyles = {
  rankingCGList: {
    width: "100%",
    padding: 8,
    marginTop: 8,
    marginBottom: 8,
  },

  rankingCard: {
    width: dw * 0.4,
    height: dw * 0.4,
    borderRadius: 36,
    padding: 12,
    marginBottom: 12,
    justifyContent: "center",
    marginRight: 12,
    elevation: 6,
  },

  customArea: {
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: `${ColorSet.navyColor(1)}`,
    borderRadius: 12,
    padding: 12,
    elevation: 6,
  },
}

const textStyles = {
  Title: {
    ...fontStyles.HyeminBold({ size: 10 }),
    marginBottom: 15,
  },
  // Ranking CG 선택 영역
  TopTitle: {
    ...fontStyles.HyeminBold({ size: 6 }),
    marginBottom: 15,
  },
  TopContent: {
    ...fontStyles.HyeminBold({ size: 5 }),
    width: "100%",
  },
  rankingCard: {
    ...fontStyles.HyeminBold({ size: 5, bold: "bold" }),
  },

  // User CG 선택 영역
  BotTitle: {
    ...fontStyles.HyeminBold({ size: 6 }),
  },
  BotContent: {
    ...fontStyles.HyeminBold({ size: 5 }),
  },
  customArea: {
    ...fontStyles.HyeminBold({ size: 5, color: "white" }),
  },
}
