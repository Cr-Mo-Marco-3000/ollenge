import React from "react-native"
import { View, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native"
import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import styled from "styled-components"
import BeforeStartCard from "./BeforeStartCard"
import {
  RankingChallengeIcon,
  NormalChallengeIcon,
} from "../../assets/images/MyCGScreen/MyCGScreen"
import { FAB, Portal, Provider } from "react-native-paper"
import { useState } from "react"

const BeforeStart = () => {
  const [fabButton, setfabButton] = useState(false)
  const onStateChange = () => {
    setfabButton(!fabButton)
  }
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
    <Provider>
      <Portal>
        <ScrollBackground>
          <DivideView>
            <IconView>
              <RankingChallengeIcon />
            </IconView>
            <AppBoldText>랭킹 챌린지</AppBoldText>
          </DivideView>
          {tempList
            .filter((listItem) => listItem.isChallenge)
            .map((challengeInfo, idx) => (
              <BeforeStartCard key={idx} challengeInfo={challengeInfo} />
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
              <BeforeStartCard key={idx} challengeInfo={challengeInfo} />
            ))}
        </ScrollBackground>
        <FAB.Group
          open={fabButton}
          visible
          icon={fabButton ? "minus" : "plus"}
          color="white"
          fabStyle={{
            backgroundColor: "#FCBE32",
            borderRadius: 100,
          }}
          actions={[
            {
              icon: "barcode-scan",
              label: "초대 코드 입력",
              color: "white",
              onPress: () => console.log("여기 함수 넣자"),
              labelStyle: {
                color: "#FCBE32",
                fontWeight: "bold",
              },
              style: {
                backgroundColor: "#FCBE32",
                borderRadius: 100,
              },
              size: "medium",
            },
            {
              icon: "run",
              label: "새 챌린지 생성",
              labelStyle: {
                fontWeight: "bold",
                color: "#FCBE32",
              },
              color: "white",
              onPress: () => console.log("여기 함수 넣자"),
              style: {
                color: "white",
                borderRadius: 100,
                backgroundColor: "#FCBE32",
              },
              size: "medium",
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
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
export default BeforeStart

const IconView = styled.View`
  width: 15%;
  height: 50px;
`
