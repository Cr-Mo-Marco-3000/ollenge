import React from "react"

import { Pressable, ScrollView, View, StyleSheet, Image } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useEffect, useState } from "react"

import { AuthorizationInstance } from "../../api/settings"
import ColorSet from "../../style/ColorSet"
import TopMargin from "./../common/TopMargin"
import AppBoldText from "./../common/AppBoldText"
import AppText from "./../common/AppText"
import TeamRankItem from "./TeamRankItem"
import { RFPercentage } from "react-native-responsive-fontsize"
import MyTeamRankItem from "./MyTeamRankItem"

function ProceedingRank({ challengeInfo, hideModal }) {
  const instance = AuthorizationInstance()
  const [teams, setTeams] = useState()
  const [myTeam, setMyTeam] = useState()

  useEffect(() => {
    instance
      .get(`/api/challenge/ongoing/${challengeInfo.challengePresetID}`)
      .then((res) => {
        setTeams(res.data.rankingList)
        if (res.data.userRanking) {
          setMyTeam(res.data.userRanking)
        }
      })
      .catch((err) => console.log(err))
  }, [challengeInfo])

  console.log(challengeInfo)
  return (
    <View style={{ flex: 1 }}>
      <TopMargin />
      <View style={{ height: "4%" }} />
      <Pressable onPress={hideModal} style={{ marginLeft: "4%" }}>
        <AntDesign name="arrowleft" size={24} color={`${ColorSet.navyColor(1)}`} />
      </Pressable>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.scrollInnerContainer}>
          <View style={styles.topArea}>
            <View style={styles.textArea}>
              <AppBoldText color={"orange"} size={3.5}>
                {challengeInfo.presetTopic}
              </AppBoldText>
              <View
                style={{
                  width: "95%",
                  alignSelf: "center",
                  marginTop: "2%",
                }}
              >
                <AppText size={2.5}>{challengeInfo.presetDescription}</AppText>
              </View>
            </View>
          </View>
          <Image
            source={{ uri: challengeInfo.presetImg }}
            style={styles.imgBox}
            resizeMode="cover"
          />
          {teams && myTeam && (
            <View style={styles.rankItemContainer}>
              {teams.map((team, key) => {
                return <TeamRankItem team={team} key={key} />
              })}
            </View>
          )}
        </View>
      </ScrollView>
      {myTeam && <MyTeamRankItem team={myTeam} />}
    </View>
  )
}
export default ProceedingRank

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: "1%",
  },
  scrollInnerContainer: {
    marginBottom: "20%",
  },
  topArea: {
    height: RFPercentage(30),
    justifyContent: "center",
  },
  imgBox: {
    width: RFPercentage(30),
    height: RFPercentage(30),
    position: "absolute",
    alignSelf: "center",
    zIndex: -10,
    opacity: 0.8,
  },
  textArea: {
    borderRadius: 10,
    backgroundColor: `${ColorSet.whiteColor(0.85)}`,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
})
