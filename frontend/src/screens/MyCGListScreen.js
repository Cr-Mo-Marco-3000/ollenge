import React, { KeyboardAvoidingView, Text, View } from "react-native"
import styled from "styled-components"
import AppBoldText from "../components/common/AppBoldText"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import BeforeStart from "../components/MyCGScreen/BeforeStart"
import Challenging from "../components/MyCGScreen/Challenging"
import Ended from "../components/MyCGScreen/Ended"
import ColorSet from "../style/ColorSet"
import TopMargin from "../components/common/TopMargin"
import { FAB, Portal, Provider } from "react-native-paper"
import { useState, useContext, useEffect } from "react"
import { Modal } from "react-native"
import AppCard from "../components/common/AppCard"
import { MailIcon } from "../assets/images/MyCGScreen/MyCGScreen"
import AppButton from "../components/common/AppButton"
import { AuthorizationInstance } from "../api/settings"
import { useNavigation } from "@react-navigation/native"
import { RoomContext } from "../../store/room-context"

function MyCGListScreen() {
  const Tab = createMaterialTopTabNavigator()
  const navigation = useNavigation()
  const [fabButton, setfabButton] = useState(false)
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [errorFlag, setErrorFlag] = useState(true)
  const [rankingCGList, setRankingCGList] = useState([])
  const [userCGList, setUserCGList] = useState([])
  const [totalChallengeInfo, setTotalChallengeInfo] = useState({})
  const [newFlag, setNewFlag] = useState(false)

  const instance = AuthorizationInstance()

  const roomCtx = useContext(RoomContext)
  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      roomCtx.resetRoomData()
    })
    return focusHandler
  }, [navigation])

  useEffect(() => {
    let temp = false
    for (const challenge of rankingCGList) {
      if (!challenge.isChecked) {
        temp = true
        break
      }
    }
    if (!temp) {
      for (const challenge of userCGList) {
        if (!challenge.isChecked) {
          temp = true
          break
        }
      }
    }
    setNewFlag(temp)
  }, [rankingCGList, userCGList])

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const res = await instance.get("/api/user/completed")

    const newRCGList = res.data.rankingChallengeList
    const newUCGList = res.data.userChallengeList

    // ??? ?????? ????????? ???
    let participateNumber = 0

    participateNumber += newRCGList.length
    participateNumber += newUCGList.length

    // ?????? ?????????
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

    // ????????? ?????? ??????
    const newTotalChallengeInfo = {
      participateNumber: participateNumber,
      averageSuccess: averageSuccess,
      totalScore: totalScore,
    }

    setRankingCGList(newRCGList)
    setUserCGList(newUCGList)
    setTotalChallengeInfo(newTotalChallengeInfo)
  }

  const onStateChange = () => {
    setfabButton(!fabButton)
  }

  const openAndClose = () => {
    setShowCodeInput(!showCodeInput)
  }

  // ???????????? ???????????? ????????? ?????? ???????????? ??????
  const joinChallenge = async () => {
    try {
      const challengeId = parseInt(inputValue.slice(8))
      const inviteCode = inputValue.slice(0, 8)
      const res = await instance.post("/api/challenge/participation", { challengeId, inviteCode })
      roomCtx.getRoomInfo(challengeId)
      roomCtx.getUserList(challengeId)
      setShowCodeInput(!showCodeInput)
      navigation.push("CGRoom")
    } catch (error) {
      setErrorFlag(false)
      setTimeout(() => {
        setErrorFlag(true)
      }, 3000)
    }
  }

  const createChallenge = () => {
    navigation.push("CGCreate")
  }

  return (
    <Provider>
      {showCodeInput && (
        <Modal animationType="fade" statusBarTranslucent={true} transparent={true}>
          <OutsideKeyboardAvoidingView behavior={"padding"}>
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
                          {errorFlag ? (
                            <ErrorFlagView>
                              <AppBoldText pxSize={20}>?????? ?????? ??????</AppBoldText>
                            </ErrorFlagView>
                          ) : (
                            <ErrorFlagView>
                              <AppBoldText size={2} color={"hotPink"}>
                                ?????? ????????? ??????????????????!
                              </AppBoldText>
                            </ErrorFlagView>
                          )}
                        </InnerRow>
                        <InnerRow>
                          <AppTextInput
                            textAlign="center"
                            autoFocus={true}
                            underlineColorAndroid={ColorSet.navyColor(0.3)}
                            onChangeText={(e) => {
                              setInputValue(e)
                            }}
                            onSubmitEditing={joinChallenge}
                            blurOnSubmit={false}
                          ></AppTextInput>
                        </InnerRow>
                        <InnerRow>
                          <ButtonView>
                            <AppButton handler={joinChallenge} title={"??????"} />
                          </ButtonView>
                        </InnerRow>
                      </InnerArea>
                    </Card>
                  </AppCard>
                </CardView>
              </InputView>
              {/* </InnerSide> */}
            </Outside>
          </OutsideKeyboardAvoidingView>
        </Modal>
      )}
      <Portal>
        <Body>
          {/* Header?????? */}
          <TopMargin />
          <Header>
            <HeaderTextView>
              <HeaderTextColumn>
                <AppBoldText align={"left"}>??? ?????????</AppBoldText>
              </HeaderTextColumn>
              <HeaderTextColumn></HeaderTextColumn>
              <HeaderTextColumn></HeaderTextColumn>
            </HeaderTextView>
          </Header>

          <Tab.Navigator
            style={{
              flex: 8,
            }}
            screenOptions={{
              tabBarLabelStyle: { fontSize: 16, fontFamily: "HyeminBold" },
              // ?????????
              tabBarActiveTintColor: `${ColorSet.orangeColor(1)}`,
              tabBarInactiveTintColor: `${ColorSet.navyColor(0.5)}`,
              // ???????????? => ?????? ??? ?????? ????????? ??????????
              tabBarIndicatorStyle: {
                backgroundColor: `${ColorSet.orangeColor(1)}`,
              },
            }}
          >
            <Tab.Screen name="?????? ???" component={Challenging} />
            <Tab.Screen name="?????? ???" component={BeforeStart} />
            <Tab.Screen
              name="??????"
              options={{
                tabBarBadge: () => {
                  if (newFlag) {
                    return (
                      <View style={{ position: "relative", right: "140%", bottom: "5%" }}>
                        <AppBoldText size={2} color={"orange"}>
                          new
                        </AppBoldText>
                      </View>
                    )
                  }
                },
              }}
            >
              {() => (
                <Ended
                  rankingCGList={rankingCGList}
                  userCGList={userCGList}
                  totalChallengeInfo={totalChallengeInfo}
                  navigation={navigation}
                  getList={getList}
                />
              )}
            </Tab.Screen>
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
                label: "?????? ?????? ??????",
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
                label: "??? ????????? ??????",
                labelStyle: {
                  fontWeight: "bold",
                  color: "#FCBE32",
                },
                color: "white",
                onPress: createChallenge,
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
          {/* ???????????? */}
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

// styled-components ??????

// Header
const Header = styled.View`
  /* ?????? ?????? 1 => 0.7??? ?????? */
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
const OutsideKeyboardAvoidingView = styled.KeyboardAvoidingView`
  height: 100%;
  width: 100%;
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
  width: 80%;
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
  font-size: 20px;
  padding-left: 2.5%;
  color: ${ColorSet.navyColor(1)};
  font-family: "HyeminBold";
`

const ButtonView = styled.View`
  justify-content: center;
  align-items: center;
  height: 70%;
  width: 100%;
`

const ErrorFlagView = styled.View`
  height: 100%;
  justify-content: center;
`
