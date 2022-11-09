import React, { useEffect, useState } from "react"
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import PageBase, { fontStyles } from "./PageBase"

// import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import ColorSet from "../../style/ColorSet"
import AppButton from "../common/AppButton"

const formChanger = (dateData) => {
  const hour = "0" + dateData.getHours()
  const min = "0" + dateData.getMinutes()
  return hour.slice(-2) + ":" + min.slice(-2)
}

export default function Page6({ info, setInfo }) {
  const [startTime, setStartTime] = useState(new Date(0))
  const [endTime, setEndTime] = useState(new Date(0))

  const onChange = (event, selectedDate, type) => {
    if (type === "start") {
      setStartTime(selectedDate)
    } else {
      setEndTime(selectedDate)
    }
  }
  const showTimepicker = (type) => {
    DateTimePickerAndroid.open({
      value: type === "start" ? startTime : endTime,
      onChange: (event, selectedDate) => onChange(event, selectedDate, type),
      mode: "time",
      is24Hour: true,
    })
  }

  useEffect(() => {
    setInfo((prev) => {
      return {
        ...prev,
        startTime: formChanger(startTime) + ":00",
        endTime: formChanger(endTime) + ":00",
      }
    })
  }, [startTime, setStartTime, endTime, setEndTime])
  return (
    <>
      <PageBase toNext={"Page7"}>
        {/* <Text style={fontStyles.HyeminBold({ size: 9 })}>챌린지 인증 시간 설정</Text> */}
        <Text style={fontStyles.HyeminBold({ size: 4 })}>
          챌린지 인증 시간을 입력해주세요.{"\n"}해당 시간이 지나가면 그날 인증은 불가능합니다.
        </Text>
        <View style={frameStyles.wholeFrame}>
          <View style={frameStyles.pickerTop}>
            <Text style={{ ...textStyles.pickerTop(), flex: 1 }}>
              {formChanger(startTime) !== "00:00" ? formChanger(startTime) : "Start Time"}
            </Text>
            <Text style={textStyles.pickerTop(9)}>/</Text>
            <Text style={{ ...textStyles.pickerTop(), flex: 1 }}>
              {formChanger(endTime) !== "00:00" ? formChanger(endTime) : "End Time"}
            </Text>
          </View>
          <View style={frameStyles.pickerBot}>
            {/* <View style={{ flex: 1, height: 40, margin: 10 }}>
              <AppButton
                handler={() => showTimepicker("start")}
                backColor="navy"
                title={"시작 시간 설정"}
              />
            </View>
            <View style={{ flex: 1, height: 40, margin: 10 }}>
              <AppButton
                handler={() => showTimepicker("end")}
                backColor="navy"
                title={"종료 시간 설정"}
              />
            </View> */}
          </View>
        </View>
      </PageBase>
    </>
  )
}

const textStyles = StyleSheet.create({
  pickerTop: (size = 6) => {
    return { ...fontStyles.HyeminBold({ size }) }
  },
})

const frameStyles = StyleSheet.create({
  wholeFrame: {
    width: "100%",
    backgroundColor: `${ColorSet.whiteColor(1)}`,
    elevation: 4,
    borderRadius: 12,
    marginTop: 12,
  },
  pickerTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 12,
    padding: 6,
    paddingLeft: 12,
    paddingRight: 12,
  },
  pickerBot: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: 6,
    paddingRight: 6,
  },
})
