import React, { useEffect, useState } from "react"
import { Pressable, Text, View } from "react-native"
import ColorSet from "../../style/ColorSet"
import { dh } from "../../style/DeviceInfo"
import PageBase, { fontStyles } from "./PageBase"

const words = {
  "이미지 비교": "최초 등록한 이미지를 기준으로 업로드 이미지와 비교하여 인증하는 방법입니다.",
  "자유 인증": "아무 사진을 등록해도 인증이 되는 방법입니다. 팀원들간의 기준에 따라 진행됩니다.",
  // "이미지 특성 분석":
  //   "이미지에서 특성을 추출해 특정 단어와 매치되는 사진을 찍어 인증하는 방법입니다.",
}

const reqForm = ["feature", "none", "classifi"]

export default function Page2({ info, setInfo, toNext, cancelAll }) {
  const [selIndex, setSelIndex] = useState(-1)
  const [auth, setAuth] = useState(info.authType)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setInfo((prev) => {
      return { ...prev, authType: auth }
    })
    setDisabled(auth === "")
  }, [auth, setAuth])

  return (
    <PageBase toNext={toNext} disabled={disabled} cancelAll={cancelAll}>
      <Text style={styles.header}>팀 목표 설정</Text>
      {/* 랭킹 챌린지 종류별 카드 렌더링 */}
      {Object.keys(words).map((key, ind) => {
        return (
          <Pressable
            key={ind}
            onPress={() => {
              setSelIndex(ind)
              setAuth(reqForm[ind])
            }}
            style={{ width: "100%" }}
          >
            <View style={styles.Card(auth === reqForm[ind])}>
              <Text style={styles.Title(auth === reqForm[ind])}>{key}</Text>
              <Text style={styles.Content(auth === reqForm[ind])} numberOfLines={2}>
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
  Title: (selected) => {
    const color = selected ? "white" : `${ColorSet.navyColor(1)}`
    return {
      ...fontStyles.HyeminBold({ size: 6, align: "left", color }),
      marginBottom: 15,
    }
  },

  Content: (selected) => {
    const color = selected ? "white" : `${ColorSet.navyColor(1)}`
    return {
      ...fontStyles.Hyemin({ size: 4, align: "left", color }),
    }
  },
  Card: (selected) => {
    return {
      width: "100%",
      backgroundColor: selected === true ? `${ColorSet.navyColor(1)}` : "white",
      marginBottom: 12,
      borderRadius: 12,
      elevation: 12,
      padding: 12,
    }
  },

  header: { ...fontStyles.HyeminBold({ size: 8 }), textAlign: "center", marginBottom: dh * 0.04 },
}
