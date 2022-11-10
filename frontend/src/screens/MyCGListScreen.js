import React from "react-native"
import styled from "styled-components"
import AppBoldText from "../components/common/AppBoldText"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import BeforeStart from "../components/MyCGScreen/BeforeStart"
import Challenging from "../components/MyCGScreen/Challenging"
import Ended from "../components/MyCGScreen/Ended"
import ColorSet from "../style/ColorSet"
import TopMargin from "../components/common/TopMargin"
import { FAB, Portal, Provider } from "react-native-paper"
import { useState, useContext } from "react"
import { Modal, Pressable, TextInput } from "react-native"
import AppCard from "../components/common/AppCard"
import { View } from "react-native"
import { MailIcon } from "../assets/images/MyCGScreen/MyCGScreen"
import AppButton from "../components/common/AppButton"
import { AuthorizationInstance } from "../api/settings"
import { createStackNavigator } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"
import { RoomContext } from "../../../store/room-context"

function MyCGListScreen() {
  const Tab = createMaterialTopTabNavigator()
  const Stack = createStackNavigator()
  const navigation = useNavigation()
  const [fabButton, setfabButton] = useState(false)
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const instance = AuthorizationInstance()

  const onStateChange = () => {
    setfabButton(!fabButton)
  }

  const openAndClose = () => {
    setShowCodeInput(!showCodeInput)
  }
  const roomCtx = useContext(RoomContext)

  // 참여하기 토글에서 버튼을 눌러 날아가는 경우
  const joinChallenge = async () => {
    try {
      const challengeId = parseInt(inputValue.slice(8))
      const inviteCode = inputValue.slice(0, 8)
      const res = await instance.post("/api/challenge/participation", { challengeId, inviteCode })
      roomCtx.getRoomInfo(challengeId)
      roomCtx.getUserList(challengeId)
      navigation.push("CGRoom")
      setShowCodeInput(!showCodeInput)
      navigation.push("CGRoom")
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <Provider>
      {showCodeInput && (
        <Modal animationType="fade" statusBarTranslucent={true} transparent={true}>
          <Outside onPress={openAndClose}>
            {/* <InnerSide> */}
            <InputView>
              <CardView>
                <AppCard>
                  <Card>
                    <InnerArea>
                      <InnerRow>
                        <IconView>
                          <MailIcon />
                        </IconView>
                        <AppBoldText>초대 코드 입력</AppBoldText>
                      </InnerRow>
                      <InnerRow>
                        <AppTextInput
                          textAlign="center"
                          autoFocus={true}
                          underlineColorAndroid={ColorSet.navyColor(1)}
                          onChangeText={(e) => {
                            setInputValue(e)
                          }}
                        ></AppTextInput>
                      </InnerRow>
                      <InnerRow>
                        <ButtonView>
                          <AppButton handler={joinChallenge} title={"확인"} />
                        </ButtonView>
                      </InnerRow>
                    </InnerArea>
                  </Card>
                </AppCard>
              </CardView>
            </InputView>
            {/* </InnerSide> */}
          </Outside>
        </Modal>
      )}
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
            <Tab.Screen name="도전 중">{(props) => <Challenging />}</Tab.Screen>
            <Tab.Screen name="시작 전">{(props) => <BeforeStart />}</Tab.Screen>
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
                onPress: openAndClose,
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

const Outside = styled.Pressable`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`

const InputView = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
`

const CardView = styled.View`
  width: 70%;
  height: 100%;
`

const Card = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const InnerArea = styled.View`
  height: 90%;
  width: 90%;
  justify-content: center;
  align-items: center;
`

const InnerRow = styled.View`
  flex: 3.3;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const IconView = styled.View`
  height: 70%;
  width: 25%;
`

const AppTextInput = styled.TextInput`
  width: 100%;
  height: 100%;
  font-size: 30px;
  padding-left: 2.5%;
  color: ${ColorSet.navyColor(1)};
`

const ButtonView = styled.View`
  justify-content: center;
  align-items: center;
  height: 70%;
  width: 100%;
`
