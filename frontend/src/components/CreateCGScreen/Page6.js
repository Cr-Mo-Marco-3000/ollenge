import React, { useEffect, useState } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
import PageBase, { fontStyles } from "./PageBase"

import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import ColorSet from "../../style/ColorSet"
import AppButton from "../common/AppButton"
import { dh } from "../../style/DeviceInfo"

const formChanger = (dateData) => {
  const hour = "0" + dateData.getHours()
  const min = "0" + dateData.getMinutes()
  return hour.slice(-2) + ":" + min.slice(-2)
}

export default function Page6({ info, setInfo, toNext, cancelAll }) {
  const [startTime, setStartTime] = useState(info.startTime)
  const [endTime, setEndTime] = useState(info.endTime)
  const [disabled, setDisabled] = useState(false)

  const changeDate = (event, selectedDate, type) => {
    const newValue = formChanger(selectedDate)
    if (type === "start") {
      setStartTime(newValue)
    } else {
      setEndTime(newValue)
    }
  }
  const showTimepicker = (type) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event, selectedDate) => changeDate(event, selectedDate, type),
      mode: "time",
      is24Hour: true,
    })
  }

  useEffect(() => {
    setInfo((prev) => {
      return {
        ...prev,
        startTime: startTime,
        endTime: endTime,
      }
    })
    if (endTime !== "" && startTime > endTime) {
      Alert.alert("종료시간은 시작시간 보다 커야합니다!")
    }
    setDisabled(startTime === "" || endTime === "" || startTime >= endTime)
  }, [startTime, setStartTime, endTime, setEndTime])
  return (
    <>
      <PageBase toNext={toNext} disabled={disabled} cancelAll={cancelAll}>
        <Text style={{ ...fontStyles.HyeminBold({ size: 9 }), marginBottom: dh * 0.05 }}>
          인증 시간 설정
        </Text>
        <Text style={fontStyles.HyeminBold({ size: 4 })}>
          챌린지 인증 시간을 입력해주세요.{"\n"}해당 시간이 지나가면 그날 인증은 불가능합니다.
        </Text>
        <View style={frameStyles.wholeFrame}>
          <View style={frameStyles.pickerTop}>
            <Text style={{ ...textStyles.pickerTop(), flex: 1 }}>
              {startTime !== "" ? startTime : "Start Time"}
            </Text>
            <Text style={textStyles.pickerTop(9)}>/</Text>
            <Text style={{ ...textStyles.pickerTop(), flex: 1 }}>
              {endTime !== "" ? endTime : "End Time"}
            </Text>
          </View>
          <View style={frameStyles.pickerBot}>
            <View style={{ flex: 1, height: 40, margin: 10 }}>
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
            </View>
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
