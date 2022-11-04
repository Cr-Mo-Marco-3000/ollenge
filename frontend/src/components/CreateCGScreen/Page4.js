import React from "react"
import { Text, View } from "react-native"
import TextInputContainer from "../common/TextInputContainer"
import PageBase, { fontStyles } from "./PageBase"

export default function Page4() {
  return (
    <PageBase toNext={"Page5"}>
      <View style={{ width: "100%", height: "100%", flex: 1 }}>
        <TextInputContainer errorMsg={false} />
      </View>
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
