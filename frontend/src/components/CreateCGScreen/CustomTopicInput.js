import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import ColorSet from "../../style/ColorSet"
import PageBase, { fontStyles } from "./PageBase"

export default function CustinTopicInput({ topic, setTopic, setClicked }) {
  const [inputText, setInputText] = useState(topic)

  return (
    <PageBase hideBtn={true}>
      <Text style={styles.titleText}>챌린지 목표 입력</Text>
      <Text style={styles.contentText}>진행할 목표을 입력해주세요</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={{
            flex: 1,
            paddingRight: 4,
            borderRightWidth: 2,
            ...fontStyles.Hyemin({ size: 5 }),
          }}
          onChangeText={setInputText}
          value={inputText}
          multiline={true}
          maxLength={50}
        />
        <Text style={{ paddingLeft: 4 }}>{inputText.length}/50</Text>
      </View>
      <Pressable
        style={{ width: "100%", marginTop: 24 }}
        onPress={() => {
          setTopic(inputText)
          setClicked(false)
        }}
      >
        <Text
          style={{
            width: "100%",
            padding: 18,
            borderRadius: 12,
            ...fontStyles.Hyemin({ size: 6, color: "white" }),
            backgroundColor: `${ColorSet.orangeColor(1)}`,
          }}
        >
          입력 완료
        </Text>
      </Pressable>
    </PageBase>
  )
}

const styles = StyleSheet.create({
  inputBox: {
    width: "100%",
    backgroundColor: "white",
    elevation: 12,
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    ...fontStyles.HyeminBold({ size: 9 }),
    marginBottom: 12,
  },

  contentText: {
    ...fontStyles.Hyemin({ size: 5 }),
    marginBottom: 24,
  },
})
