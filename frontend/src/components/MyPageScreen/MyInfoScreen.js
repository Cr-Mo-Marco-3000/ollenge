import React, { useEffect, useState } from "react"

import { ScrollView, StyleSheet, View, Image } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"
import { useNavigation } from "@react-navigation/native"
import { Button } from "react-native-paper"
import styled from "styled-components"
import { useContext } from "react"

import { DefaultImage, PencilIcon, HeartIcon1 } from "../../assets/images/index"
import ColorSet from "../../style/ColorSet"

import AppText from "../common/AppText"
import AppBoldText from "../common/AppBoldText"
import BedgeCard from "./BedgeCard"
import TopMargin from "../common/TopMargin"
import { AuthContext } from "../../../store/auth-context"

function MyInfoScreen({ userInfo }) {
  const navigation = useNavigation()
  const authCtx = useContext(AuthContext)
  const [badges, setBadges] = useState()
  const [selectedBadge, setSelectedBadge] = useState()

  const badgesImg = {
    User: [
      require("../../assets/images/badges/User-0.png"),
      require("../../assets/images/badges/User-1.png"),
      require("../../assets/images/badges/User-2.png"),
      require("../../assets/images/badges/User-3.png"),
    ],
    WakeUp: [
      require("../../assets/images/badges/WakeUp-0.png"),
      require("../../assets/images/badges/WakeUp-1.png"),
      require("../../assets/images/badges/WakeUp-2.png"),
      require("../../assets/images/badges/WakeUp-3.png"),
    ],
    Exercise: [
      require("../../assets/images/badges/Exercise-0.png"),
      require("../../assets/images/badges/Exercise-1.png"),
      require("../../assets/images/badges/Exercise-2.png"),
      require("../../assets/images/badges/Exercise-3.png"),
    ],
    Study: [
      require("../../assets/images/badges/Study-0.png"),
      require("../../assets/images/badges/Study-1.png"),
      require("../../assets/images/badges/Study-2.png"),
      require("../../assets/images/badges/Study-3.png"),
    ],
    Pills: [
      require("../../assets/images/badges/Pills-0.png"),
      require("../../assets/images/badges/Pills-1.png"),
      require("../../assets/images/badges/Pills-2.png"),
      require("../../assets/images/badges/Pills-3.png"),
    ],
    Salad: [
      require("../../assets/images/badges/Salad-0.png"),
      require("../../assets/images/badges/Salad-1.png"),
      require("../../assets/images/badges/Salad-2.png"),
      require("../../assets/images/badges/Salad-3.png"),
    ],

    Cleaning: [
      require("../../assets/images/badges/Cleaning-0.png"),
      require("../../assets/images/badges/Cleaning-1.png"),
      require("../../assets/images/badges/Cleaning-2.png"),
      require("../../assets/images/badges/Cleaning-3.png"),
    ],
  }

  useEffect(() => {
    const typeSet = {
      User: 0,
      WakeUp: 1,
      Study: 2,
      Exercise: 3,
      Pills: 4,
      Salad: 5,
      Cleaning: 6,
    }
    const temp = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
    const userBadge = authCtx.userInfo.selectedBadge

    setSelectedBadge(badgesImg[userBadge.type][userBadge.grade])

    const badgeData = authCtx.badgeData
    for (const badge of badgeData) {
      const type = typeSet[badge.type]
      if (badge.badgeFlag) {
        temp[type][badge.grade - 1] = 1
      } else {
        temp[type][badge.grade - 1] = 2
      }
    }
    setBadges(temp)
  }, [authCtx])

  function editPressHandler() {
    navigation.push("EditInfo")
  }

  return (
    <ScrollView style={styles.rootScreen}>
      <TopMargin />
      <View style={styles.logoutBox}>
        <Button
          icon="logout"
          textColor={`${ColorSet.navyColor(1)}`}
          onPress={authCtx.logout}
          theme={{
            fonts: {
              labelLarge: {
                fontFamily: "HyeminBold",
              },
            },
          }}
        >
          로그아웃
        </Button>
      </View>
      <View style={styles.scrollContainer}>
        <View style={styles.imageBox}>
          {userInfo.profileImg ? (
            <Image
              source={{ uri: userInfo.profileImg }}
              style={{ width: "100%", height: "100%", borderRadius: 100 }}
            />
          ) : (
            <DefaultImage />
          )}
        </View>
        <View style={styles.infoContainer}>
          <UserInfoBox>
            <UserNicknameBox onPress={editPressHandler}>
              <AppBoldText>{userInfo.nickname}</AppBoldText>
              <View
                style={{
                  width: RFPercentage(3),
                  height: RFPercentage(3),
                  marginLeft: 5,
                }}
              >
                <PencilIcon />
              </View>
            </UserNicknameBox>
            <AppText>{userInfo.userScore}점</AppText>
            <View style={{ width: RFPercentage(8), height: RFPercentage(8) }}>
              <Image
                source={selectedBadge}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
          </UserInfoBox>
          {badges ? (
            <BedgeCardContainer>
              <View style={styles.bedgeCardItem}>
                <BedgeCard type={"User"} flag={badges[0]} />
              </View>
              <View style={styles.bedgeCardItem}>
                <BedgeCard type={"WakeUp"} flag={badges[1]} />
              </View>
              <View style={styles.bedgeCardItem}>
                <BedgeCard type={"Study"} flag={badges[2]} />
              </View>
              <View style={styles.bedgeCardItem}>
                <BedgeCard type={"Exercise"} flag={badges[3]} />
              </View>
              <View style={styles.bedgeCardItem}>
                <BedgeCard type={"Pills"} flag={badges[4]} />
              </View>
              <View style={styles.bedgeCardItem}>
                <BedgeCard type={"Salad"} flag={badges[5]} />
              </View>
              <View style={styles.bedgeCardItem}>
                <BedgeCard type={"Cleaning"} flag={badges[6]} />
              </View>
            </BedgeCardContainer>
          ) : (
            <></>
          )}
        </View>
      </View>
    </ScrollView>
  )
}
export default MyInfoScreen

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: `${ColorSet.paleBlueColor(1)}`,
  },
  logoutBox: {
    width: "100%",
    alignItems: "flex-end",
  },
  scrollContainer: {
    flex: 1,
    alignItems: "center",
  },
  imageBox: {
    width: RFPercentage(15),
    height: RFPercentage(15),
    top: RFPercentage(1),
    zIndex: 100,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: "white",
    height: "auto",
    width: "100%",
    top: -RFPercentage(5),
    paddingTop: RFPercentage(7),
    paddingBottom: RFPercentage(3),
    marginBottom: -RFPercentage(5),
    paddingHorizontal: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 6,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  bedgeCardItem: {
    marginVertical: "3%",
  },
})

const UserInfoBox = styled.View`
  align-items: center;
`
const UserNicknameBox = styled.Pressable`
  flex-direction: row;
`
const BedgeCardContainer = styled.View`
  margin-top: 3%;
`
