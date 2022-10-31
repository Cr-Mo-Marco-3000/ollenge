import React from "react-native"
import { View, ScrollView } from "react-native"
import AppText from "../common/AppText"
import styled from "styled-components"
import ChallengingCard from "./ChallengingCard"

const Challenging = () => {
  // const tempList = [
  //   {
  //     title: "하루 3잔 물마시기",
  //     teamName: "찬호와 아이들",
  //     memberNumber: 4,
  //     progress: 50,
  //     startDate: "10.26",
  //     endDate: "11.05",
  //   },
  // ]

  return (
    <ScrollBackground>
      <DivideView>
        <AppText>랭킹 챌린지</AppText>
      </DivideView>
      <ChallengingCard />
      <ChallengingCard />
      <ChallengingCard />
      <ChallengingCard />
      <DivideView>
        <AppText>일반 챌린지</AppText>
      </DivideView>
      <ChallengingCard />
      <ChallengingCard />
      <ChallengingCard />
      <ChallengingCard />
    </ScrollBackground>
  )
}

const ScrollBackground = styled.ScrollView`
  background: #edf8ff;
`

const DivideView = styled.View``
export default Challenging
