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
import { FAB, Portal, Provider } from "react-native-paper"
import { useState } from "react"

function MyCGListScreen({ idHandler }) {
  const Tab = createMaterialTopTabNavigator()
  const [fabButton, setfabButton] = useState(false)

  const onStateChange = () => {
    setfabButton(!fabButton)
  }
  return (
    <Provider>
      <Portal>
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
            <Tab.Screen name="도전 중">
              {(props) => <Challenging idHandler={idHandler} />}
            </Tab.Screen>
            <Tab.Screen name="시작 전">
              {(props) => <BeforeStart idHandler={idHandler} />}
            </Tab.Screen>
            <Tab.Screen name="종료" component={Ended} />
          </Tab.Navigator>
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
          {/* 아래부분 */}
        </Body>
      </Portal>
    </Provider>
  )
}

export default MyCGListScreen

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
