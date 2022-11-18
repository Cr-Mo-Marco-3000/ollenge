import React from "react"

import { StyleSheet, View } from "react-native"
import styled from "styled-components"
import ColorSet from "../../style/ColorSet"

import AppBoldText from "../common/AppBoldText"
import GainedBedgeItem from "./GainedBedgeItem"
import NotGainedBedgeItem from "./NotGainedBedgeItem"
import WaitingBedgeItem from "./WaitingBedgeItem"

/* 
GainedBedgeItem : 이미 얻은 뱃지 (착용중인 경우 applied={true} 추가)
WaitingeBedgeItem: 취득 조건은 달성했으나 아직 획득하지 않은 것
NotGainedBedgeItem: 취득조건 미달성
*/
function BedgeCard({ type, flag, idLst }) {
  const badgesTitle = {
    user: {
      name: "꾸준한 노력가",
      title: "챌린지",
      checkpoint: [1, 2, 3, 4],
      src: [
        require("../../assets/images/badges/User-0.png"),
        require("../../assets/images/badges/User-1.png"),
        require("../../assets/images/badges/User-2.png"),
        require("../../assets/images/badges/User-3.png"),
      ],
    },
    ranking1: {
      name: "힘 세고 강한 아침",
      title: "아침 기상",
      checkpoint: [1, 2, 3, 4],
      src: [
        require("../../assets/images/badges/WakeUp-0.png"),
        require("../../assets/images/badges/WakeUp-1.png"),
        require("../../assets/images/badges/WakeUp-2.png"),
        require("../../assets/images/badges/WakeUp-3.png"),
      ],
    },
    ranking2: {
      name: "운동 매니아",
      title: "운동",
      checkpoint: [1, 2, 3, 4],
      src: [
        require("../../assets/images/badges/Exercise-0.png"),
        require("../../assets/images/badges/Exercise-1.png"),
        require("../../assets/images/badges/Exercise-2.png"),
        require("../../assets/images/badges/Exercise-3.png"),
      ],
    },
    ranking3: {
      name: "척척박사",
      title: "공부",
      checkpoint: [1, 2, 3, 4],
      src: [
        require("../../assets/images/badges/Study-0.png"),
        require("../../assets/images/badges/Study-1.png"),
        require("../../assets/images/badges/Study-2.png"),
        require("../../assets/images/badges/Study-3.png"),
      ],
    },
    ranking4: {
      name: "하루 한 알",
      title: "영양제",
      checkpoint: [1, 2, 3, 4],
      src: [
        require("../../assets/images/badges/Pills-0.png"),
        require("../../assets/images/badges/Pills-1.png"),
        require("../../assets/images/badges/Pills-2.png"),
        require("../../assets/images/badges/Pills-3.png"),
      ],
    },
    ranking5: {
      name: "야채는 나의 힘",
      title: "샐러드",
      checkpoint: [1, 2, 3, 4],
      src: [
        require("../../assets/images/badges/Salad-0.png"),
        require("../../assets/images/badges/Salad-1.png"),
        require("../../assets/images/badges/Salad-2.png"),
        require("../../assets/images/badges/Salad-3.png"),
      ],
    },
    ranking6: {
      name: "깨끗한 환경",
      title: "정리정돈",
      checkpoint: [1, 2, 3, 4],
      src: [
        require("../../assets/images/badges/Cleaning-0.png"),
        require("../../assets/images/badges/Cleaning-1.png"),
        require("../../assets/images/badges/Cleaning-2.png"),
        require("../../assets/images/badges/Cleaning-3.png"),
      ],
    },
  }

  return (
    <View style={styles.CardContainer}>
      <AppBoldText>{badgesTitle[type].name}</AppBoldText>
      {flag ? (
        <BedgeBox>
          {flag.map((sta, key) => {
            if (sta == 0) {
              return (
                <NotGainedBedgeItem
                  type={type}
                  typeData={badgesTitle[type]}
                  grade={key}
                  badgeId={idLst[key]}
                  key={key}
                />
              )
            } else if (sta == 1) {
              return (
                <GainedBedgeItem
                  type={type}
                  typeData={badgesTitle[type]}
                  grade={key}
                  badgeId={idLst[key]}
                  key={key}
                />
              )
            } else {
              return (
                <WaitingBedgeItem
                  type={type}
                  typeData={badgesTitle[type]}
                  grade={key}
                  badgeId={idLst[key]}
                  key={key}
                />
              )
            }
          })}
        </BedgeBox>
      ) : (
        <></>
      )}
    </View>
  )
}
export default BedgeCard

const styles = StyleSheet.create({
  CardContainer: {
    backgroundColor: `${ColorSet.paleBlueColor(1)}`,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})

const BedgeBox = styled.View`
  flex-direction: row;
  margin-top: 2%;
`
