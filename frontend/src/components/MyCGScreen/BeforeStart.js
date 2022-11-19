import React from "react-native"
import { Dimensions } from "react-native"
// import { useNavigation } from "@react-navigation/native"
import AppBoldText from "../common/AppBoldText"
import styled from "styled-components"
import BeforeStartCard from "./BeforeStartCard"
import {
  RankingChallengeIcon,
  NormalChallengeIcon,
} from "../../assets/images/MyCGScreen/MyCGScreen"
import { useState, useEffect, useContext } from "react"
import { AuthorizationInstance } from "../../api/settings"
import { RoomContext } from "../../../store/room-context"
import NoContent from "./NoContent"

const BeforeStart = ({ navigation }) => {
  // const navigation = useNavigation()
  const [rankingCGList, setRankingCGList] = useState([])
  const [userCGList, setUserCGList] = useState([])
  const instance = AuthorizationInstance()

  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      const reload = async () => {
        const res = await instance.get("/api/user/scheduled")
        const NewRankingCGList = res.data.rankingChallengeList
        const NewUserCGList = res.data.userChallengeList
        setRankingCGList(NewRankingCGList)
        setUserCGList(NewUserCGList)
      }
      reload()
    })
    return focusHandler
  }, [navigation])

  // const rankingCGList = [
  //   {
  //     challengeId: 34,
  //     challengeImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
  //     challengeName: "찬호와 아이들",
  //     challengeTopic: "하루 3잔 물마시기",
  //     startDate: new Date(2022, 10, 10),
  //     endDate: new Date(2022, 10, 15),
  //     peopleCnt: 4,
  //   },
  // ]

  // const userCGList = [
  //   {
  //     challengeId: 35,
  //     challengeImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
  //     challengeName: "찬호와 아이들",
  //     challengeTopic: "하루 3잔 물마시기",
  //     startDate: new Date(2022, 10, 10),
  //     endDate: new Date(2022, 10, 15),
  //     peopleCnt: 4,
  //   },
  // ]

  useEffect(() => {
    // 리스트 렌더링
    const getChallenge = async () => {
      try {
        const res = await instance.get("/api/user/scheduled")
        const NewRankingCGList = res.data.rankingChallengeList
        const NewUserCGList = res.data.userChallengeList
        setRankingCGList(NewRankingCGList)
        setUserCGList(NewUserCGList)
      } catch (err) {
        console.log(err)
      }
    }
    getChallenge()
  }, [])

  const roomCtx = useContext(RoomContext)
  // 이미 나열되어 있는 리스트를 눌러 CGRoom에 진입하는 경우

  const pressHandler = (id) => {
    roomCtx.getRoomInfo(id)
    roomCtx.getUserList(id)
    navigation.push("CGRoom")
  }
  return (
    <ChallengingBody>
      {rankingCGList.length || userCGList.length ? (
        <ScrollBackground>
          {rankingCGList.length ? (
            <DivideView>
              <IconView>
                <RankingChallengeIcon />
              </IconView>
              <AppBoldText>랭킹 챌린지</AppBoldText>
            </DivideView>
          ) : null}
          {rankingCGList.map((challengeInfo) => (
            <BeforeStartCard
              key={challengeInfo.challengeId}
              challengeInfo={challengeInfo}
              func={() => {
                pressHandler(challengeInfo.challengeId)
              }}
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
          {userCGList.map((challengeInfo) => (
            <BeforeStartCard
              key={challengeInfo.challengeId}
              challengeInfo={challengeInfo}
              func={() => {
                pressHandler(challengeInfo.challengeId)
              }}
            />
          ))}
          <UnderMargin></UnderMargin>
        </ScrollBackground>
      ) : (
        <NoContent message={"시작 전인"} />
      )}
    </ChallengingBody>
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

const ChallengingBody = styled.View`
  height: 100%;
`
const UnderMargin = styled.View`
  width: 100%;
  height: 100px;
`
