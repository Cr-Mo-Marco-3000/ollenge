import React from "react-native"
import styled from "styled-components"
import AppText from "../components/common/AppText"
import AppBoldText from "../components/common/AppBoldText"
import { NavigationContainer } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import BeforeStart from "../components/MyCGScreen/BeforeStart"
import Challenging from "../components/MyCGScreen/Challenging"
import Ended from "../components/MyCGScreen/Ended"
import ColorSet from "../style/ColorSet"
import TopMargin from "../components/common/TopMargin"
function MyCGScreen() {
  const Tab = createMaterialTopTabNavigator()

  return (
    <Body>
      {/* Header부분 */}
      <TopMargin />
      <Header>
        <HeaderTextView>
          <HeaderTextColumn>
            <AppBoldText>내 챌린지</AppBoldText>
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
            // 글자색
            tabBarActiveTintColor: `${ColorSet.orangeColor(1)}`,
            tabBarInactiveTintColor: `${ColorSet.navyColor(0.5)}`,
            // 언더바색 => 대체 왜 이걸 이렇게 짜놨지?
            tabBarIndicatorStyle: {
              backgroundColor: `${ColorSet.orangeColor(1)}`,
            },
          }}
        >
          <Tab.Screen name="도전 중" component={Challenging} />
          <Tab.Screen name="시작 전" component={BeforeStart} />
          <Tab.Screen name="종료" component={Ended} />
        </Tab.Navigator>
      </NavigationContainer>
      {/* 아래부분 */}
    </Body>
  )
}

export default MyCGScreen

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
