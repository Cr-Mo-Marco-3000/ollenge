import React from "react-native"
import { View, ScrollView, Image, Dimensions } from "react-native"
import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import styled from "styled-components"
import EndedCard from "./EndedCard"
import {
  RankingChallengeIcon,
  NormalChallengeIcon,
} from "../../assets/images/MyCGScreen/MyCGScreen"
import { DataTable } from "react-native-paper"
import ColorSet from "../../style/ColorSet"

const Ended = () => {
  const windowWidth = Dimensions.get("window").width
  const tempList = [
    {
      isChallenge: true,
      title: "하루 3잔 물마시기",
      teamName: "찬호와 아이들",
      memberNumber: 4,
      progress: 20,
      startDate: "10.26",
      endDate: "11.05",
    },
    {
      isChallenge: true,
      title: "하루 3잔 물마시기",
      teamName: "찬호와 아이들",
      memberNumber: 4,
      progress: 50,
      startDate: "10.26",
      endDate: "11.05",
    },
    {
      isChallenge: false,
      title: "하루 3잔 물마시기",
      teamName: "찬호와 아이들",
      memberNumber: 4,
      progress: 50,
      startDate: "10.26",
      endDate: "11.05",
    },
  ]

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#edf8ff",
      }}
    >
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
                  18회 참여
                </AppBoldText>
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AppBoldText size={2} color="ligntBlue">
                  79,24%
                </AppBoldText>
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AppBoldText size={2} color="ligntBlue">
                  2,257점
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
          <DivideView>
            <IconView>
              <RankingChallengeIcon />
            </IconView>
            <AppBoldText>랭킹 챌린지</AppBoldText>
          </DivideView>
          {tempList
            .filter((listItem) => listItem.isChallenge)
            .map((challengeInfo, idx) => (
              <EndedCard key={idx} challengeInfo={challengeInfo} />
            ))}
          <DivideView>
            <IconView>
              <NormalChallengeIcon />
            </IconView>
            <AppBoldText>일반 챌린지</AppBoldText>
          </DivideView>
          {tempList
            .filter((listItem) => !listItem.isChallenge)
            .map((challengeInfo, idx) => (
              <EndedCard key={idx} challengeInfo={challengeInfo} />
            ))}
        </View>
      </ScrollBackground>
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
