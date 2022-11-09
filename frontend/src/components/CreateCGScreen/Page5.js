import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import PageBase, { fontStyles } from "./PageBase"
import DatepickerRange from "react-native-range-datepicker"
import ColorSet from "../../style/ColorSet"
import DeviceInfo from "../../style/DeviceInfo"
const { dw } = DeviceInfo
// react-native-range-datepicker의 RandeDatePicker 의 index 파일 수정해야함(원찬호 파일 기준)!
// Month.js 파일도...

// https://www.npmjs.com/package/react-native-range-datepicker

const formDate = (date) => {
  date.setHours(9)
  const temp = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  return temp
}

export default function Page5({ info, setInfo }) {
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
    <PageBase toNext={"Page6"} disabled={disabled}>
      {/* <Text style={fontStyles.HyeminBold({ size: 9 })}>챌린지 기간 설정</Text> */}
      <Text style={{ ...fontStyles.HyeminBold({ size: 5 }) }}>
        챌린지를 진행할 기간을 입력해주세요
      </Text>
      <View
        style={{
          flex: 1,
          marginTop: 48,
          marginBottom: 48,
          borderRadius: 12,
          alignSelf: "center",
          overflow: "hidden",
          borderWidth: 2,
          borderColor: `${ColorSet.navyColor(1)}`,
        }}
      >
        <DatepickerRange
          showClose={false}
          onConfirm={(sd, ud) => {
            setDate({ startDate: sd, endDate: ud })
          }}
          buttonColor={`${ColorSet.navyColor(1)}`}
          placeHolderStart={"시작일"}
          placeHolderUntil={"종료일"}
          selectedBackgroundColor={`${ColorSet.navyColor(1)}`}
        />
      </View>
    </PageBase>
  )
}
