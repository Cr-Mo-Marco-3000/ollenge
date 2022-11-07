import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import TextInputContainer from "../common/TextInputContainer"
import PageBase, { fontStyles } from "./PageBase"

export default function Page4({ info, setInfo }) {
  const [description, setDescription] = useState(info.challengeDescription)

  useEffect(() => {
    setInfo((prev) => {
      return { ...prev, challengeDescription: description }
    })
  }, [description, setDescription])
  return (
    <PageBase toNext={"Page5"}>
      <View style={{ width: "100%", height: "100%", flex: 1, justifyContent: "center" }}>
        <View>
          <Text style={styles.Title}>챌린지 설명</Text>
          <Text style={styles.Content}>챌린지에 대한 설명을 간략히 입력해주세요!</Text>
        </View>
        <TextInputContainer
          inputText={description}
          inputHandler={setDescription}
          errorMsg={false}
        />
      </View>
    </PageBase>
  )
}

const styles = {
  Title: {
    ...fontStyles.HyeminBold({ size: 9, bold: "bold", align: "center" }),
    marginBottom: 15,
  },

  Content: {
    ...fontStyles.Hyemin({ size: 5, align: "center" }),
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
