import React, { useContext, useEffect, useState } from "react"

import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import { Provider } from "react-native-paper"
import { useHeaderHeight } from "@react-navigation/elements"

import ColorSet from "../style/ColorSet"
import { CGStartFlag, CGAuthTimeFlag } from "../functions/index"
import { RoomContext } from "../../store/room-context"

import UserListTap from "../components/CGRoomScreen/UserListTap"
import CGRoomInfoTag from "../components/CGRoomScreen/CGRoomInfoTag"
import CGLeaveBtn from "../components/CGRoomScreen/CGLeaveBtn"
import FeedsArea from "../components/CGRoomScreen/FeedsArea"
import EndCGModal from "../components/CGRoomScreen/EndCGModal"

function CGRoomScreen() {
  const roomCtx = useContext(RoomContext)

  const roomInfo = roomCtx.roomInfo
  const userList = roomCtx.userList

  const navigation = useNavigation()
  const headerHight = useHeaderHeight()
  const [isStarted, setIsStarted] = useState("")
  const [isAuthed, setIsAuth] = useState(false)
  const [isResist, setIsResist] = useState(false)
  const [isTime, setIsTime] = useState("")
  const [visible, setVisible] = useState()

  const hideModal = function () {
    setVisible(false)
  }

  useEffect(() => {
    setIsStarted(CGStartFlag(roomInfo.startDate, roomInfo.endDate))
    setIsTime(CGAuthTimeFlag(roomInfo.startTime, roomInfo.endTime))
  }, [roomInfo])

  useEffect(() => {
    setIsAuth(roomCtx.isAuthed)
    setIsResist(roomCtx.isResist)
  }, [roomCtx])

  useEffect(() => {
    if (Object.keys(roomInfo).length !== 0) {
      if (isStarted == "end" && !roomInfo.isChecked) {
        setVisible(true)
      }
    }
  }, [roomCtx])

  return (
    <Provider>
      <EndCGModal visible={visible} hideModal={hideModal} />
      <LinearGradient
        style={{ flex: 1 }}
        colors={[`${ColorSet.whiteColor(1)}`, `${ColorSet.paleBlueColor(1)}`]}
      >
        <View style={{ height: headerHight }} />
        <UserListTap navigation={navigation} />
        <CGRoomInfoTag roomInfo={roomInfo} userList={userList} />

        {isStarted == "waiting" && (
          <CGLeaveBtn challengeId={roomInfo.challengeId} userNum={userList.length} />
        )}
        <FeedsArea
          roomInfo={roomInfo}
          isStarted={isStarted}
          isAuthed={isAuthed}
          isTime={isTime}
          isResis={isResist}
        ></FeedsArea>
      </LinearGradient>
    </Provider>
  )
}
export default CGRoomScreen

// 이하 예전 자료들
{
  /* <View style={styles.buttonContainer}>
          {isStarted == "waiting" && (
            <>
              <CGStartCount />
              <InviteCodeBtn inviteCode={roomInfo.inviteCode} challengeId={roomInfo.challengeId} />
            </>
          )}
          {isStarted == "playing" && !isAuthed && <TodayAuthCount isTime={isTime} />}
          {isStarted == "end" && <EndingReport />}
          {isResist && isStarted == "playing" && isTime == "playing" && !isAuthed && (
            <CGAuthBtn navigation={navigation} />
          )}
          {!isResist && <ImageResistBtn navigation={navigation} roomInfo={roomInfo} />}
        </View> */
}
// const styles = StyleSheet.create({
//   buttonContainer: {
//     paddingHorizontal: "5%",
//   },
//   buttonBox: {
//     width: "100%",
//     height: "15%",
//     marginTop: "5%",
//   },
// })
