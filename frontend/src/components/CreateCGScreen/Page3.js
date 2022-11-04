import React from "react"
import { Text, View } from "react-native"
import PageBase, { fontStyles } from "./PageBase"

export default function Page2() {
  return (
    <PageBase toNext={"Page4"}>
      {/* 랭킹 챌린지 종류별 카드 렌더링 */}
      {Object.keys(words).map((key, ind) => {
        return (
          <View key={ind} style={styles.Card}>
            <Text style={styles.Title}>{key}</Text>
            <Text style={styles.Content} numberOfLines={2}>
              {words[key]}
            </Text>
          </View>
        )
      })}
    </PageBase>
  )
}

const words = {
  "이미지 비교": "최초 등록한 이미지를 기준으로 업로드 이미지와 비교하여 인증하는 방법입니다.",
  "이미지 특성 분석":
    "이미지에서 특성을 추출해 특정 단어와 매치되는 사진을 찍어 인증하는 방법입니다.",
}

const styles = {
  Title: {
    ...fontStyles.HyeminBold({ size: 7, bold: "bold", align: "left" }),
    marginBottom: 15,
  },

  Content: {
    ...fontStyles.Hyemin({ size: 5, align: "left" }),
  },
  Card: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 12,
    borderRadius: 12,
    elevation: 12,
    padding: 12,
  },
}
