import React from "react-native"
import { View, Text, StyleSheet, Modal, Dimensions, ScrollView } from "react-native"
import TopMargin from "../common/TopMargin"
import { Pressable } from "react-native"
import AppCard from "../common/AppCard"
import styled from "styled-components"
import { TriangleIcon } from "../../assets/images"
import { TriangleIcon2 } from "../../assets/images"
import ParticipatingDetailCard from "./ParticipatingDetailCard"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

export default function ParticipatingDetail(props) {
  const tempList = [{}, {}, {}, {}, {}]
  const arrayLength = tempList.length
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator>
        {tempList.map((element, idx) => {
          return <ParticipatingDetailCard key={idx} index={idx} arrayLength={arrayLength} />
        })}
      </ScrollView>
    </View>
  )
}
