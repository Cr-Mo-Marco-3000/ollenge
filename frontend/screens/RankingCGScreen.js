import React from "react-native"
import styled from "styled-components"
import AppText from "../components/common/AppText"
import AppBoldText from "../components/common/AppBoldText"
import { NavigationContainer } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import ColorSet from "../style/ColorSet"
import Parcitipating from "../components/RankingCGScreen/Participating"
import Proceeding from "../components/RankingCGScreen/Proceeeding"
import TopMargin from "../components/common/TopMargin"

function RankingCGScreen() {
  const Tab = createMaterialTopTabNavigator()

  return (
    <Body>
      <TopMargin />
      {/* Header부분 */}
      <Header>
        <HeaderTextView>
          <HeaderTextColumn>
            <AppBoldText>랭킹 챌린지</AppBoldText>
          </HeaderTextColumn>
          <HeaderTextColumn></HeaderTextColumn>
        </HeaderTextView>
      </Header>
      <NavigationContainer>
        <Tab.Navigator
          style={{
            flex: 8,
          }}
          screenOptions={{
            tabBarLabelStyle: { fontSize: 16, fontFamily: "HyeminBold" },
            tabBarActiveTintColor: `${ColorSet.orangeColor(1)}`,
            tabBarInactiveTintColor: `${ColorSet.navyColor(0.5)}`,
            tabBarIndicatorStyle: {
              backgroundColor: `${ColorSet.orangeColor(1)}`,
            },
          }}
        >
          <Tab.Screen name="진행 중" component={Proceeding} />
          <Tab.Screen name="참여 신청" component={Parcitipating} />
        </Tab.Navigator>
      </NavigationContainer>
      {/* 아래부분 */}
    </Body>
  )
}

export default RankingCGScreen

const Body = styled.View`
  flex: 1;
  background-color: white;
  width: 100%;
`

// styled-components 부분

// Header
const Header = styled.View`
  flex: 1;
  background-color: white;
`

const HeaderTextView = styled.View`
  flex-direction: row;
  flex: 6;
  justify-content: center;
  align-items: flex-end;
  padding: 10px 23px;
`

const HeaderTextColumn = styled.View`
  flex: 1;
`
