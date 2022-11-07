import React, { useState } from "react"
import { Text } from "react-native"
import PageBase, { fontStyles } from "./PageBase"
import DatePicker from "react-native-modern-datepicker"

export default function Page6() {
  const [time, setTime] = useState("")

  return (
    <PageBase toNext={"Page7"}>
      <Text style={fontStyles.HyeminBold({ size: 9 })}>챌린지 인증 시간 설정</Text>
      <Text style={fontStyles.HyeminBold({ size: 4 })}>
        챌린지 인증을 마감할 시간을 입력해주세요.{"\n"}해당 시간이 지나가면 그날 인증은
        불가능합니다.
      </Text>
      <DatePicker
        mode="time"
        minuteInterval={3}
        onTimeChange={(selectedTime) => setTime(selectedTime)}
        style={{ margin: 12, borderRadius: 24, overflow: "hidden" }}
      />
    </PageBase>
  )
}
