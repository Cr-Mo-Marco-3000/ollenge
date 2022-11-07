import React, { useEffect, useState } from "react"
import { Pressable, Text, View } from "react-native"
import ColorSet from "../../style/ColorSet"
import PageBase, { fontStyles } from "./PageBase"

const words = {
  "이미지 비교": "최초 등록한 이미지를 기준으로 업로드 이미지와 비교하여 인증하는 방법입니다.",
  "이미지 특성 분석":
    "이미지에서 특성을 추출해 특정 단어와 매치되는 사진을 찍어 인증하는 방법입니다.",
  "자유 인증": "아무 사진을 등록해도 인증이 되는 방법입니다. 팀원들간의 기준에 따라 진행됩니다.",
}

export default function Page2({ info, setInfo }) {
  const [auth, setAuth] = useState(info.authType)
  const [selIndex, setSelIndex] = useState(-1)
  useEffect(() => {
    setInfo((prev) => {
      return { ...prev, authType: Object.keys(words)[selIndex] }
    })
  }, [auth, setAuth])
  return (
    <PageBase toNext={"Page4"}>
      {/* 랭킹 챌린지 종류별 카드 렌더링 */}
      {Object.keys(words).map((key, ind) => {
        return (
          <Pressable
            key={ind}
            onPress={() => {
              setSelIndex(ind)
            }}
          >
            <View
              style={{
                ...styles.Card,
                borderWidth: selIndex === ind ? 4 : 0,
                borderColor: `${ColorSet.greenColor(1)}`,
              }}
            >
              <Text style={styles.Title}>{key}</Text>
              <Text style={styles.Content} numberOfLines={2}>
                {words[key]}
              </Text>
            </View>
          </Pressable>
        )
      })}
    </PageBase>
  )
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
