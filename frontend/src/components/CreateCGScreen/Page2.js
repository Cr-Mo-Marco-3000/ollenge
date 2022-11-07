import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"
import ColorSet from "../../style/ColorSet"
import DeviceInfo from "../../style/DeviceInfo"
import PageBase, { fontStyles } from "./PageBase"
import CustomTopicInput from "./CustomTopicInput"

const RankingCGs = ["아침 기상", "공부하기", "운동하기", "1일 1영양제", "1일 1샐러드", "정리정돈"]
const { dw, dh } = DeviceInfo

export default function Page2({ info, setInfo }) {
  const [topic, setTopic] = useState(info.challengeTopic)
  const navigation = useNavigation()
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    setInfo((prev) => {
      return { ...prev, challengeTopic: topic }
    })
  }, [topic, setTopic])

  useEffect(() => {
    setTopic(info.challengeTopic)
  }, [info, setTopic])

  const RankingCard = ({ title = "아직 지정 값 없음" }) => {
    return (
      <Pressable
        onPress={() => {
          setTopic(title)
        }}
        style={{
          ...frameStyles.rankingCard,
          backgroundColor: title === topic ? `${ColorSet.navyColor(1)}` : "rgb(255, 191, 153)",
        }}
      >
        <Text
          style={{
            ...textStyles.rankingCard,
            color: title === topic ? "rgb(255, 191, 153)" : `${ColorSet.navyColor(1)}`,
          }}
        >
          {title}
        </Text>
      </Pressable>
    )
  }

  return (
    <PageBase toNext={"Page3"}>
      {clicked === false && (
        <>
          {/* Choiced Topic */}
          <View style={{ width: "100%" }}>
            <Text style={textStyles.Title}>선택한 목표: {topic}</Text>
          </View>

          {/* Ranking CG Area */}
          <View flex={2} style={{ width: "100%" }}>
            {/* <Text style={textStyles.TopTitle}>{words.TopTitle}</Text> */}
            <Text style={textStyles.TopContent}>{words.TopContent}</Text>
            <ScrollView style={frameStyles.rankingCGList}>
              {RankingCGs.map((rcg, index) => {
                return <RankingCard title={rcg} key={index} />
              })}
            </ScrollView>
          </View>

          {/* User CG Area */}
          <View flex={1} style={{ width: "100%", justifyContent: "space-around" }}>
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
    </PageBase>
  )
}

const words = {
  TopTitle: "🍊 오랭지 목표 🍊",
  TopContent: `오랭지에서 지정한${"\n"}목표와 인증 방식을 사용합니다.`,

  BotTitle: "원하시는 미션이 없나요?",
  BotContent: "자유롭게 생성해보세요!",

  customContent: "클릭하여 작성하기",
}

const frameStyles = {
  rankingCGList: {
    flex: 1,
    padding: 8,
  },

  rankingCard: {
    width: "100%",
    borderRadius: 36,
    padding: 12,
    marginBottom: 12,
  },

  customArea: {
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: `${ColorSet.navyColor(1)}`,
    borderRadius: 12,
    padding: 18,
  },
}

const textStyles = {
  Title: {
    ...fontStyles.HyeminBold({ size: 6 }),
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
    borderBottomWidth: 2,
  },
  rankingCard: {
    ...fontStyles.HyeminBold({ size: 7, bold: "bold" }),
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
