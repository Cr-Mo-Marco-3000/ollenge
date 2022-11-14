import React, { useEffect, useState } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
import PageBase, { fontStyles } from "./PageBase"
import DatepickerRange from "react-native-range-datepicker"
import ColorSet from "../../style/ColorSet"

// react-native-range-datepicker의 RandeDatePicker 의 index 파일 수정해야함(원찬호 파일 기준)!
// Month.js 파일도...

// https://www.npmjs.com/package/react-native-range-datepicker

const formDate = (date) => {
  date.setHours(9)
  const temp = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  return temp
}

export default function Page5({ info, setInfo, toNext, cancelAll }) {
  const [disabled, setDisabled] = useState(true)
  const [date, setDate] = useState({
    startDate: new Date(info.startDate),
    endDate: new Date(info.endDate),
  })

  useEffect(() => {
    const SD = formDate(new Date(date.startDate))
    const ED = formDate(new Date(date.endDate))

    setInfo((prev) => {
      return { ...prev, startDate: SD, endDate: ED }
    })

    setDisabled(isNaN(date.startDate) || isNaN(date.endDate))
  }, [date, setDate])

  return (
    <PageBase toNext={toNext} disabled={disabled} cancelAll={cancelAll}>
      <View style={styles.calendar}>
        <DatepickerRange
          showClose={false}
          onConfirm={(sd, ud) => {
            const today = new Date()
            const startDay = new Date(sd).setHours(9)

            if (startDay > today) {
              setDate({ startDate: sd, endDate: ud })
            } else {
              Alert.alert("시작일은 다음날부터 지정 가능합니다")
            }
          }}
          buttonColor={`${ColorSet.navyColor(1)}`}
          showReset={false}
          minimumDate={new Date().setHours(0)}
          placeHolderStart={"시작일"}
          placeHolderUntil={"종료일"}
          selectedBackgroundColor={`${ColorSet.navyColor(1)}`}
        />
      </View>
    </PageBase>
  )
}

const styles = StyleSheet.create({
  calendar: {
    flex: 1,
    marginBottom: 28,
    borderRadius: 12,
    alignSelf: "center",
  },
})
