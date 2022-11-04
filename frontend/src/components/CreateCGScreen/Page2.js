import React from "react"
import { Text, View } from "react-native"
import PageBase, { fontStyles } from "./PageBase"

export default function Page2() {
  return (
    <PageBase toNext={"Page3"}>
      <View style={{ justifyContent: "space-between" }}>
        {/* Choiced Topic */}
        <Text style={styles.Title}>선택한 목표: 물 마시기</Text>

        {/* Top Area */}
        <View flex={2}>
          <Text style={styles.TopTitle}>{words.TopTitle}</Text>
          <Text style={styles.TopContent}>{words.TopContent}</Text>
        </View>

        {/* Bottom Area */}
        <View flex={1}>
          <Text style={styles.BotTitle}>{words.BotTitle}</Text>
          <Text style={styles.BotContent}>{words.BotContent}</Text>
        </View>
      </View>
    </PageBase>
  )
}

const words = {
  TopTitle: "🍊 오랭지 목표 🍊",
  TopContent: `오랭지에서 지정한${"\n"}목표와 인증 방식을 사용합니다.`,

  BotTitle: "원하시는 미션이 없나요?",
  BotContent: "자유롭게 생성해보세요!",
}

const styles = {
  Title: {
    ...fontStyles.HyeminBold({ size: 6 }),
    marginBottom: 15,
  },
  TopTitle: {
    ...fontStyles.HyeminBold({ size: 6 }),
    marginBottom: 15,
  },
  TopContent: {
    ...fontStyles.HyeminBold({ size: 5 }),
  },
  BotTitle: {
    ...fontStyles.HyeminBold({ size: 6 }),
  },
  BotContent: {
    ...fontStyles.HyeminBold({ size: 5 }),
  },
}
