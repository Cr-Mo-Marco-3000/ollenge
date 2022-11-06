import React from "react"

import { ScrollView, StyleSheet, View } from "react-native"
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

function MyInfoScreen() {
  const navigation = useNavigation()
  const authCtx = useContext(AuthContext)

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
          <DefaultImage />
        </View>
        <View style={styles.infoContainer}>
          <UserInfoBox>
            <UserNicknameBox onPress={editPressHandler}>
              <AppBoldText>userNickname</AppBoldText>
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
            <AppText>userScore</AppText>
            <View style={{ width: RFPercentage(8), height: RFPercentage(8) }}>
              <HeartIcon1 />
            </View>
          </UserInfoBox>
          <BedgeCardContainer>
            <View style={styles.bedgeCardItem}>
              <BedgeCard />
            </View>
            <View style={styles.bedgeCardItem}>
              <BedgeCard />
            </View>
            <View style={styles.bedgeCardItem}>
              <BedgeCard />
            </View>
            <View style={styles.bedgeCardItem}>
              <BedgeCard />
            </View>
            <View style={styles.bedgeCardItem}>
              <BedgeCard />
            </View>
            <View style={styles.bedgeCardItem}>
              <BedgeCard />
            </View>
          </BedgeCardContainer>
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
