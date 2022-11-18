import React, { useEffect, useState } from "react"
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"

import DeviceInfo from "../../style/DeviceInfo"
import PageBase from "./PageBase"
import AppText from "../common/AppText"
import { AuthorizationInstance } from "../../api/settings"
import NotGainedBedgeItem from "../MyPageScreen/NotGainedBedgeItem"
import AppBoldText from "../common/AppBoldText"
import { setScore } from "../../screens/UserRankScreen"

const { dw, dh } = DeviceInfo
const instance = AuthorizationInstance()

const badgeTypes = [
  ["user"],
  ["ranking1", "ranking2", "ranking3"],
  ["ranking4", "ranking5", "ranking6"],
]

const initialBadgeGrades = {
  user: 0,
  ranking1: 0,
  ranking2: 0,
  ranking3: 0,
  ranking4: 0,
  ranking5: 0,
  ranking6: 0,
}

const ShowUserBadge = ({ navigation, route }) => {
  const { nickname, userScore, userId, profileImg } = route.params.user
  const [status, setStatus] = useState("pending")
  const [badgeGrades, setBadgeGrades] = useState({ ...initialBadgeGrades })
  const [badges, setBadges] = useState()

  const gogogetBadges = (newData) => {
    const temp = { ...initialBadgeGrades }
    newData.forEach((bdg) => {
      const { badgeFlag, grade, type } = bdg
      if ((badgeFlag === true) & (temp[type] < grade)) {
        temp[type] = grade
      }
    })
    setBadgeGrades(temp)
  }
  useEffect(() => {
    const focusEvent = navigation.addListener("focus", () => {
      const reload = async () => {
        const res = await instance.get(`/api/badge/${userId}`)
        const badgesInfo = res.data.badgeList
        setBadges(badgesInfo)
        gogogetBadges(badgesInfo)
        setStatus("idle")
      }
      setStatus("pending")
      reload()
    })
    return focusEvent
  }, [navigation])

  return (
    <>
      {status !== "idle" && (
        <PageBase>
          <AppText>로딩 중...</AppText>
        </PageBase>
      )}
      {status === "idle" && (
        <PageBase>
          <View style={frameStyles.whole}>
            <View style={frameStyles.profile}>
              <Image
                source={
                  profileImg === null || profileImg === ""
                    ? require("../../assets/images/default-image.png")
                    : profileImg
                }
                style={{ width: dw * 0.35, height: dw * 0.35 }}
              />
            </View>
            <View alignItems="center" style={{ marginVertical: dh * 0.025 }}>
              <AppBoldText size={6}>{nickname}</AppBoldText>
              <AppText size={4} color={"orange"}>
                {setScore(userScore)}점
              </AppText>
            </View>
          </View>
          {/* 뱃지 리스트 */}
          <View style={{ backgroundColor: "white", borderRadius: 10 }}>
            {badgeTypes.map((types, index) => {
              return (
                <View key={index} style={frameStyles.badgeFrame}>
                  {types.map((type) => {
                    const temp = badgeGrades[type] - 1
                    const badgeInd = temp !== -1 ? temp : 0

                    return (
                      <View key={type} style={frameStyles.badge}>
                        <Image
                          source={badgesTitle[type].src[badgeInd]}
                          style={{
                            width: dw * 0.22,
                            height: dw * 0.22,
                            justifyContent: "center",
                            tintColor: temp === -1 ? "gray" : null,
                            opacity: temp === -1 ? 0.3 : 1,
                          }}
                        ></Image>
                      </View>
                    )
                  })}
                </View>
              )
            })}
          </View>
        </PageBase>
      )}
    </>
  )
}

const frameStyles = StyleSheet.create({
  whole: { width: "100%", marginBottom: dh * 0.02, alignItems: "center" },
  profile: { borderRadius: 200, overflow: "hidden", elevation: 20 },
  badgeFrame: { flexDirection: "row", justifyContent: "center" },
  badge: {
    borderRadius: 10,
    overflow: "hidden",
    margin: "2%",
    elevation: 100,
  },
})

export default ShowUserBadge

export const badgesTitle = {
  user: {
    name: "꾸준한 노력가",
    title: "챌린지",
    checkpoint: [1, 2, 3, 4],
    src: [
      require("../../assets/images/badges/User-0.png"),
      require("../../assets/images/badges/User-1.png"),
      require("../../assets/images/badges/User-2.png"),
      require("../../assets/images/badges/User-3.png"),
    ],
  },
  ranking1: {
    name: "힘 세고 강한 아침",
    title: "아침 기상",
    checkpoint: [1, 2, 3, 4],
    src: [
      require("../../assets/images/badges/WakeUp-0.png"),
      require("../../assets/images/badges/WakeUp-1.png"),
      require("../../assets/images/badges/WakeUp-2.png"),
      require("../../assets/images/badges/WakeUp-3.png"),
    ],
  },
  ranking2: {
    name: "운동 매니아",
    title: "운동",
    checkpoint: [1, 2, 3, 4],
    src: [
      require("../../assets/images/badges/Exercise-0.png"),
      require("../../assets/images/badges/Exercise-1.png"),
      require("../../assets/images/badges/Exercise-2.png"),
      require("../../assets/images/badges/Exercise-3.png"),
    ],
  },
  ranking3: {
    name: "척척박사",
    title: "공부",
    checkpoint: [1, 2, 3, 4],
    src: [
      require("../../assets/images/badges/Study-0.png"),
      require("../../assets/images/badges/Study-1.png"),
      require("../../assets/images/badges/Study-2.png"),
      require("../../assets/images/badges/Study-3.png"),
    ],
  },
  ranking4: {
    name: "하루 한 알",
    title: "영양제",
    checkpoint: [1, 2, 3, 4],
    src: [
      require("../../assets/images/badges/Pills-0.png"),
      require("../../assets/images/badges/Pills-1.png"),
      require("../../assets/images/badges/Pills-2.png"),
      require("../../assets/images/badges/Pills-3.png"),
    ],
  },
  ranking5: {
    name: "야채는 나의 힘",
    title: "샐러드",
    checkpoint: [1, 2, 3, 4],
    src: [
      require("../../assets/images/badges/Salad-0.png"),
      require("../../assets/images/badges/Salad-1.png"),
      require("../../assets/images/badges/Salad-2.png"),
      require("../../assets/images/badges/Salad-3.png"),
    ],
  },
  ranking6: {
    name: "깨끗한 환경",
    title: "정리정돈",
    checkpoint: [1, 2, 3, 4],
    src: [
      require("../../assets/images/badges/Cleaning-0.png"),
      require("../../assets/images/badges/Cleaning-1.png"),
      require("../../assets/images/badges/Cleaning-2.png"),
      require("../../assets/images/badges/Cleaning-3.png"),
    ],
  },
}
