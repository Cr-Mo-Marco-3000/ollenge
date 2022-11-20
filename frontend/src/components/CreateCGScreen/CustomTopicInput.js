import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import ColorSet from "../../style/ColorSet"
import PageBase, { fontStyles } from "./PageBase"

export default function CustinTopicInput({ topic, setTopic, setClicked }) {
  const [inputText, setInputText] = useState(topic)

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
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
        <Text style={{ paddingLeft: 4 }}>
          {"   "}
          {inputText.length}/50
        </Text>
      </View>
      <View flexDirection="row">
        <TouchableOpacity
          style={{ flex: 1, padding: 4, marginTop: 24 }}
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
            목표 설정
          </Text>
        </TouchableOpacity>
        <Pressable
          style={{ flex: 1, padding: 4, marginTop: 24 }}
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
              ...fontStyles.Hyemin({ size: 6, color: `${ColorSet.blackColor(1)}` }),
              backgroundColor: `${ColorSet.grayColor(1)}`,
            }}
          >
            취소
          </Text>
        </Pressable>
      </View>
    </View>
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
    ...fontStyles.HyeminBold({ size: 8 }),
    marginBottom: 12,
  },

  contentText: {
    ...fontStyles.Hyemin({ size: 5 }),
    marginBottom: 24,
  },
})
