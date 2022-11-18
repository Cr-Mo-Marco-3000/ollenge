import React from "react"

import { StyleSheet, View, Pressable } from "react-native"
import { Portal, Modal } from "react-native-paper"
import { useRef, useEffect, useContext, useState } from "react"
import LottieView from "lottie-react-native"
import { RFPercentage } from "react-native-responsive-fontsize"
import { LinearGradient } from "expo-linear-gradient"

import AppBoldText from "../common/AppBoldText"
import AppText from "../common/AppText"
import { PartyIcon } from "../../assets/images"
import { CalendarIcon, RunGirlIcon } from "../../assets/images/RankingCGScreen/RankingCGScreen"
import { RoomContext } from "./../../../store/room-context"
import { AuthContext } from "./../../../store/auth-context"
import ColorSet from "../../style/ColorSet"
import { AuthorizationInstance } from "../../api/settings"

function EndCGModal({ visible, hideModal }) {
  const animation = useRef(null)
  const instance = AuthorizationInstance()
  const closeModal = function () {
    7
    console.log(roomInfo.challengeId)
    instance
      .patch("/api/participation/flag", { challengeId: roomInfo.challengeId })
      .then((res) => {
        roomCtx.getRoomInfo(roomInfo.challengeId)
      })
      .catch((err) => console.log(err))
    hideModal()
  }

  const roomCtx = useContext(RoomContext)
  const authCtx = useContext(AuthContext)
  const userId = authCtx.userInfo.userId

  const [myInfo, setMyInfo] = useState()
  const [myRank, setMyRank] = useState(0)
  const [wholeDay, setWholeDay] = useState(0)
  const [percent, setPercent] = useState(0)

  const userList = roomCtx.userList
  const roomInfo = roomCtx.roomInfo

  useEffect(() => {
    if (Object.keys(roomCtx) !== 0 && !myInfo) {
      for (let i = 0; i < userList.length; i++) {
        const user = userList[i]
        if (user.userId == userId) {
          setMyInfo(user)
          setMyRank(i + 1)
        }
      }
    }

    if (Object.keys(roomCtx) !== 0 && !wholeDay) {
      const start = new Date(roomInfo.startDate)
      const end = new Date(roomInfo.endDate)
      const temp = Math.round((end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24 + 1)
      setWholeDay(temp)
    }
  }, [roomCtx])

  useEffect(() => {
    if (myInfo && wholeDay) {
      const temp = Math.round((myInfo.datetimeList.length / wholeDay) * 100)
      setPercent(temp)
    }
  }, [myInfo, wholeDay])

  const containerStyle = {
    backgroundColor: "white",
    borderRadius: 10,
  }

  return (
    <Portal>
      {visible ? (
        <LottieView
          autoPlay
          loop={false}
          ref={animation}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
          }}
          source={require("../../assets/Lottie/Confeti.json")}
        />
      ) : null}
      <Modal
        visible={visible}
        onDismiss={closeModal}
        contentContainerStyle={containerStyle}
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LinearGradient
          style={styles.endingContainer}
          colors={[`${ColorSet.yellowColor(1)}`, `${ColorSet.orangeColor(1)}`]}
        >
          <View style={{ width: RFPercentage(8), height: RFPercentage(8), marginVertical: "5%" }}>
            <PartyIcon />
          </View>
          {myInfo && (
            <View>
              <AppBoldText color={"white"} size={5}>
                {percent >= 80 ? "대단해요!!" : "수고하셨습니다"}
              </AppBoldText>
              <View style={{ flexDirection: "row", marginTop: "5%" }}>
                <View
                  style={{ width: RFPercentage(4), height: RFPercentage(4), marginRight: "3%" }}
                >
                  <CalendarIcon />
                </View>
                <AppText color={"white"}>
                  총 {wholeDay}일 중 {myInfo.datetimeList.length}일 참여했어요
                </AppText>
              </View>
              <View style={{ flexDirection: "row", marginVertical: "3%" }}>
                <View
                  style={{ width: RFPercentage(4), height: RFPercentage(4), marginRight: "3%" }}
                >
                  <RunGirlIcon />
                </View>
                <AppText color={"white"}>
                  총 {userList.length}명 중 {myRank}등이에요
                </AppText>
              </View>
              <AppBoldText color={"paleBlue"}>
                {percent}%의 달성률로{"\n"} 챌린지를 마감했습니다
              </AppBoldText>
            </View>
          )}
          <Pressable onPress={closeModal} style={styles.btnBox}>
            <AppText color={"navy"} size={2}>
              확인
            </AppText>
          </Pressable>
        </LinearGradient>
      </Modal>
    </Portal>
  )
}
export default EndCGModal

const styles = StyleSheet.create({
  endingContainer: {
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: "5%",
    paddingBottom: "5%",
  },
  btnBox: {
    marginTop: "5%",
    backgroundColor: `${ColorSet.paleBlueColor(1)}`,
    paddingHorizontal: "3%",
    paddingVertical: "2%",
    borderRadius: 20,
  },
})
