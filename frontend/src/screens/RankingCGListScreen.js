import React from "react-native"
import styled from "styled-components"
import AppText from "../components/common/AppText"
import AppBoldText from "../components/common/AppBoldText"
import { NavigationContainer } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import ColorSet from "../style/ColorSet"
import Participating from "../components/RankingCGScreen/Participating"
import Proceeding from "../components/RankingCGScreen/Proceeeding"
import TopMargin from "../components/common/TopMargin"
import ParticipatingDetail from "../components/RankingCGScreen/ParticipatingDetail"
import CreateCGScreen from "./CreateCGScreen"
import { Provider } from "react-native-paper"

function RankingCGListScreen(props) {
  const Tab = createMaterialTopTabNavigator()

  return (
    <Provider>
      <Body>
        <TopMargin />
        <Header>
          <HeaderTextView>
            <HeaderTextColumn>
              <AppBoldText align={"left"}>랭킹 챌린지</AppBoldText>
            </HeaderTextColumn>
            <HeaderTextColumn></HeaderTextColumn>
          </HeaderTextView>
        </Header>

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
          <Tab.Screen name="참여 신청">
            {() => <Participating makeChallenge={props.makeChallenge} />}
          </Tab.Screen>
        </Tab.Navigator>
        {/* 아래부분 */}
      </Body>
    </Provider>
  )
}

export default RankingCGListScreen

const Body = styled.View`
  flex: 1;
  background-color: white;
  width: 100%;
`

// styled-components 부분

// Header
const Header = styled.View`
  /* 여기 부분 수정 */
  flex: 0.7;
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
