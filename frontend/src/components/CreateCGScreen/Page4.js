import React, { useEffect, useState } from "react"
import { Text, TextInput, View } from "react-native"
import PageBase, { fontStyles } from "./PageBase"

export default function Page4({ info, setInfo }) {
  const [description, setDescription] = useState(info.challengeDescription)

  useEffect(() => {
    setInfo((prev) => {
      return { ...prev, challengeDescription: description }
    })
  }, [description, setDescription])

  return (
    <PageBase toNext={"Page5"} disabled={false}>
      <View style={{ width: "100%", height: "100%", flex: 1, justifyContent: "center" }}>
        <View>
          {/* <Text style={styles.Title}>챌린지 설명</Text> */}
          <Text style={styles.Content}>
            챌린지에 대한 설명을 간략히 입력해주세요!{"\n"}(선택사항)
          </Text>
        </View>
        <TextInput
          multiline
          editable
          numberOfLines={4}
          style={styles.inputArea}
          value={description}
          onChangeText={setDescription}
        />
      </View>
    </PageBase>
  )
}

const styles = {
  inputArea: {
    backgroundColor: "white",
    textAlignVertical: "top",
    height: 300,
    borderRadius: 24,
    marginTop: 36,
    elevation: 12,
    padding: 36,
    ...fontStyles.Hyemin({ size: 5, bold: "bold", align: "left", color: "black" }),
  },
  Title: {
    ...fontStyles.HyeminBold({ size: 9, bold: "bold", align: "center" }),
    marginBottom: 15,
    width: "100%",
  },

  Content: {
    ...fontStyles.Hyemin({ size: 5, align: "center" }),
    width: "100%",
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
