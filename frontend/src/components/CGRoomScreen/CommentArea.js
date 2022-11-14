import React from "react-native"
import styled from "styled-components"
import { View, Text, ScrollView, KeyboardAvoidingView, Image, Dimensions } from "react-native"
import ColorSet from "../../style/ColorSet"
import TopMargin from "../common/TopMargin"
import { AntDesign } from "@expo/vector-icons"
import AppBoldText from "../common/AppBoldText"
import AppText from "../common/AppText"
import { useState, useEffect } from "react"
import defaultImage from "../../assets/images/default-image.png"
import CommentItem from "./CommentItem"

// 본 피드

const windowWidth = Dimensions.get("window").width

const CommentArea = (props) => {
  const defaultImageUri = Image.resolveAssetSource(defaultImage).uri
  const openAndClose = props.openAndClose

  // 올린 사람 정보 등 피드정보
  let feedInfo = props.feedInfo.item

  feedInfo = {
    ...feedInfo,
    commentContent: feedInfo.feedContent,
  }

  const commentList = [
    {
      commentId: 1,
      profileImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
      userId: 34,
      nickname: "앙냥뇽",
      commentContent:
        "머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요",
      createdDatetime: "2022-11-15",
      modifiedDatetime: "2022-11-15",
    },
    {
      commentId: 2,
      profileImg: "https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg",
      userId: 34,
      nickname: "앙냥뇽",
      commentContent:
        "머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요머리아파요",
      createdDatetime: "2022-11-15",
      modifiedDatetime: "2022-11-15",
    },
  ]

  const [writedText, setWritedText] = useState("")

  const changeText = (e) => {
    setWritedText(e)
  }

  const submit = () => {
    console.log(writedText)
    setWritedText("")
  }

  return (
    <Body behavior={"padding"}>
      <TopMargin></TopMargin>
      <TopView>
        <FirstColumn>
          <BackIconView onPress={openAndClose}>
            <AntDesign name="arrowleft" size={24} color={ColorSet.navyColor(1)} />
          </BackIconView>
        </FirstColumn>
        <SecondColumn>
          <AppBoldText>댓글 목록</AppBoldText>
        </SecondColumn>
        <TriColumn></TriColumn>
      </TopView>
      {/* 스크롤뷰 */}
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <CommentItem commentInfo={feedInfo} />
        <ImageView>
          <ImageInnerView elevation={7}>
            <Image
              source={feedInfo.feedImg ? { uri: feedInfo.feedImg } : { uri: defaultImageUri }}
              style={{ width: "100%", height: "100%", borderRadius: 20 }}
              resizeMode="cover"
            />
          </ImageInnerView>
        </ImageView>
        <TextView>
          <TextInnerView>
            <AppText pxSize={16} align={"left"}>
              {feedInfo.feedContent}
            </AppText>
          </TextInnerView>
        </TextView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              borderBottomWidth: 1.5,
              borderBottomColor: ColorSet.navyColor(1),
              marginBottom: 15,
              width: "90%",
              borderRadius: 2,
            }}
          ></View>
        </View>
        {commentList.map((commentInfo, idx) => (
          <CommentItem commentInfo={commentInfo} key={idx} />
        ))}
      </ScrollView>
      <TextInputView>
        <TextInput
          placeholder={"댓글을 입력하세요"}
          autoFocus
          style={{
            elevation: 3,
          }}
          value={writedText}
          onChangeText={changeText}
          onSubmitEditing={submit}
        />
      </TextInputView>
    </Body>
  )
}

export default CommentArea

const Body = styled.KeyboardAvoidingView`
  flex: 1;
  width: 100%;
  background-color: white;
`
const TopView = styled.View`
  height: 50px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`
const TriColumn = styled.View`
  width: 33%;
  height: 100%;
  flex-direction: row;
  align-items: center;
`

const FirstColumn = styled(TriColumn)``

const SecondColumn = styled(TriColumn)`
  justify-content: center;
`

const BackIconView = styled.Pressable`
  left: 15px;
  height: 20px;
  width: 20px;
`

const ImageView = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`

const ImageInnerView = styled.View`
  width: 90%;
  height: ${((windowWidth * 0.9) / 16) * 9}px;
  border-radius: 20px;
`

const TextView = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`
const TextInnerView = styled.View`
  width: 90%;
`

const TextInputView = styled.View`
  bottom: 0;
  width: 100%;
  height: 70px;
  justify-content: center;
  align-items: center;
`

const TextInput = styled.TextInput`
  height: 50px;
  width: 95%;
  border-radius: 10px;
  background-color: white;
  padding-left: 15px;
  padding-right: 15px;
`
