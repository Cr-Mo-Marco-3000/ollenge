import React from "react-native"
import { View, Dimensions } from "react-native"
import AppBoldText from "../common/AppBoldText"
import styled from "styled-components"
import EndedCard from "./EndedCard"
import {
  RankingChallengeIcon,
  NormalChallengeIcon,
} from "../../assets/images/MyCGScreen/MyCGScreen"
import { DataTable } from "react-native-paper"
import { useEffect, useState, useContext } from "react"
import { AuthorizationInstance } from "../../api/settings"
import NoContent from "./NoContent"
import { RoomContext } from "../../../store/room-context"

const Ended = ({ navigation }) => {
  const instance = AuthorizationInstance()

  const [rankingCGList, setRankingCGList] = useState([])
  const [userCGList, setUserCGList] = useState([])
  const [totalChallengeInfo, setTotalChallengeInfo] = useState({})
  useEffect(() => {
    const getList = async () => {
      const res = await instance.get("/api/user/completed")

      const newRCGList = res.data.rankingChallengeList
      const newUCGList = res.data.userChallengeList

      // 총 참여 챌린지 수
      let participateNumber = 0

      participateNumber += newRCGList.length
      participateNumber += newUCGList.length

      // 평균 달성률
      let averageSuccess = newRCGList.reduce((pre, cur) => {
        const days =
          (new Date(cur.endDate).getTime() - new Date(cur.startDate).getTime()) /
            1000 /
            60 /
            60 /
            24 +
          1
        return pre + cur.myFeedCnt / days
      }, 0)

      averageSuccess = newUCGList.reduce((pre, cur) => {
        const days =
          (new Date(cur.endDate).getTime() - new Date(cur.startDate).getTime()) /
            1000 /
            60 /
            60 /
            24 +
          1
        return pre + cur.myFeedCnt / days
      }, averageSuccess)

      averageSuccess = Math.round((averageSuccess / participateNumber) * 100 * 100) / 100
      let totalScore = newRCGList.reduce((pre, cur) => {
        const score = cur.myFeedCnt * 10
        return pre + score
      }, 0)

      totalScore = newUCGList.reduce((pre, cur) => {
        const score = cur.myFeedCnt * 10
        return pre + score
      }, totalScore)

      // 챌린지 참여 정보
      const newTotalChallengeInfo = {
        participateNumber: participateNumber,
        averageSuccess: averageSuccess,
        totalScore: totalScore,
      }

      setRankingCGList(newRCGList)
      setUserCGList(newUCGList)
      setTotalChallengeInfo(newTotalChallengeInfo)
    }
    getList()
  }, [])

  const roomCtx = useContext(RoomContext)

  const pressHandler = (id) => {
    roomCtx.getRoomInfo(id)
    roomCtx.getUserList(id)
    navigation.push("CGRoom")
  }

  const windowWidth = Dimensions.get("window").width

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#edf8ff",
      }}
    >
      {rankingCGList.length || userCGList.length ? (
        <ScrollBackground>
          <View
            style={{
              marginTop: 30,
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DataTable
              style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                width: "90%",
                backgroundColor: "#80A7B3",
                elevation: 5,
              }}
            >
              <DataTable.Header>
                <DataTable.Title
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#80A7B3",
                  }}
                >
                  <AppBoldText size={2} color="white">
                    챌린지
                  </AppBoldText>
                </DataTable.Title>
                <DataTable.Title
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AppBoldText size={2} color="white">
                    평균 달성률
                  </AppBoldText>
                </DataTable.Title>
                <DataTable.Title
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AppBoldText size={2} color="white">
                    누적 점수
                  </AppBoldText>
                </DataTable.Title>
              </DataTable.Header>
            </DataTable>

            <DataTable
              style={{
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                width: "90%",
                backgroundColor: "white",
                elevation: 5,
              }}
            >
              <DataTable.Row>
                <DataTable.Cell
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AppBoldText size={2} color="ligntBlue">
                    {totalChallengeInfo.participateNumber}회 참여
                  </AppBoldText>
                </DataTable.Cell>
                <DataTable.Cell
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AppBoldText size={2} color="ligntBlue">
                    {totalChallengeInfo.averageSuccess >= 0 ? totalChallengeInfo.averageSuccess : 0}
                    %
                  </AppBoldText>
                </DataTable.Cell>
                <DataTable.Cell
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AppBoldText size={2} color="ligntBlue">
                    {totalChallengeInfo.totalScore}점
                  </AppBoldText>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
          <View
            style={{
              flex: 7,
            }}
          >
            {/* 챌린치 표시 */}
            {rankingCGList.length ? (
              <DivideView>
                <IconView>
                  <RankingChallengeIcon />
                </IconView>
                <AppBoldText>랭킹 챌린지</AppBoldText>
              </DivideView>
            ) : null}
            {rankingCGList.map((challengeInfo, idx) => (
              <EndedCard
                key={idx}
                challengeInfo={challengeInfo}
                func={() => {
                  pressHandler(challengeInfo.challengeId)
                }}
              />
            ))}
            {userCGList.length ? (
              <DivideView>
                <IconView>
                  <NormalChallengeIcon />
                </IconView>
                <AppBoldText>일반 챌린지</AppBoldText>
              </DivideView>
            ) : null}
            {userCGList.map((challengeInfo, idx) => (
              <EndedCard
                key={idx}
                challengeInfo={challengeInfo}
                func={() => {
                  pressHandler(challengeInfo.challengeId)
                }}
              />
            ))}
          </View>
        </ScrollBackground>
      ) : (
        <NoContent message={"종료된"} />
      )}
    </View>
  )
}

const fivePercent = (Dimensions.get("window").width * 0.05) / 2

const ScrollBackground = styled.ScrollView`
  background: #edf8ff;
`

const DivideView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 10px ${fivePercent}px;
`
export default Ended

const IconView = styled.View`
  width: 15%;
  height: 50px;
`
