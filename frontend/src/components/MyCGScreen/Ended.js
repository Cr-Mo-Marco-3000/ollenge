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
import { useContext, useEffect } from "react"
import NoContent from "./NoContent"
import { RoomContext } from "../../../store/room-context"

const Ended = ({ navigation, rankingCGList, userCGList, totalChallengeInfo, getList }) => {
  const roomCtx = useContext(RoomContext)
  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      getList()
    })
    return focusHandler
  }, [navigation])

  const pressHandler = (id) => {
    roomCtx.getRoomInfo(id)
    roomCtx.getUserList(id)
    navigation.push("CGRoom")
  }

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
                newFlag={!challengeInfo.isChecked}
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
                newFlag={!challengeInfo.isChecked}
              />
            ))}
          </View>
          <UnderMargin></UnderMargin>
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

const UnderMargin = styled.View`
  width: 100%;
  height: 70px;
`
