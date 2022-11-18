import React from "react-native"
import { Dimensions } from "react-native"
// import { useNavigation } from "@react-navigation/native"
import AppBoldText from "../common/AppBoldText"
import styled from "styled-components"
import ChallengingCard from "./ChallengingCard"
import NoContent from "./NoContent"
import {
  RankingChallengeIcon,
  NormalChallengeIcon,
} from "../../assets/images/MyCGScreen/MyCGScreen"
import { useState, useEffect, useContext } from "react"
import { AuthorizationInstance } from "../../api/settings"
import { RoomContext } from "../../../store/room-context"

const Challenging = ({ navigation }) => {
  // const navigation = useNavigation()
  const [rankingCGList, setRankingCGList] = useState([])
  const [userCGList, setUserCGList] = useState([])

  const instance = AuthorizationInstance()

  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      const reload = async () => {
        const res = await instance.get("/api/user/ongoing")
        const NewRankingCGList = res.data.rankingChallengeList
        const NewUserCGList = res.data.userChallengeList
        setRankingCGList(NewRankingCGList)
        setUserCGList(NewUserCGList)
      }
      reload()
    })
    return focusHandler
  }, [navigation])

  // 이미 나열되어 있는 리스트를 눌러 CGRoom에 진입하는 경우
  const roomCtx = useContext(RoomContext)

  const pressHandler = (id) => {
    roomCtx.getRoomInfo(id)
    roomCtx.getUserList(id)
    navigation.push("CGRoom")
  }

  useEffect(() => {
    // 리스트 렌더링
    const getChallenge = async () => {
      try {
        const res = await instance.get("/api/user/ongoing")
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
            <ChallengingCard
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
            <ChallengingCard
              key={challengeInfo.challengeId}
              challengeInfo={challengeInfo}
              func={() => {
                pressHandler(challengeInfo.challengeId)
              }}
            />
          ))}
        </ScrollBackground>
      ) : (
        <NoContent message={"도전 중인"} />
      )}
    </ChallengingBody>
  )
}

const fivePercent = (Dimensions.get("window").width * 0.05) / 2

const ChallengingBody = styled.View`
  height: 100%;
`

const ScrollBackground = styled.ScrollView`
  background: #edf8ff;
`

const DivideView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 10px ${fivePercent}px;
`
export default Challenging

const IconView = styled.View`
  width: 15%;
  height: 50px;
`
