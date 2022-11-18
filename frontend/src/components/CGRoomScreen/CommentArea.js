import React from "react-native"
import styled from "styled-components"
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  Modal,
} from "react-native"
import ColorSet from "../../style/ColorSet"
import TopMargin from "../common/TopMargin"
import { AntDesign } from "@expo/vector-icons"
import AppBoldText from "../common/AppBoldText"
import AppText from "../common/AppText"
import { useState, useEffect, useContext, useRef } from "react"
import defaultImage from "../../assets/images/default-image.png"
import CommentItem from "./CommentItem"
import { AuthorizationInstance } from "../../api/settings"
import { AuthContext } from "../../../store/auth-context"

const instance = AuthorizationInstance()

const windowWidth = Dimensions.get("window").width

const CommentArea = (props) => {
  const authCtx = useContext(AuthContext)

  const myImg = authCtx.userInfo.profileImg

  const defaultImageUri = Image.resolveAssetSource(defaultImage).uri
  const close = props.close

  // 올린 사람 정보 등 피드정보
  let feedInfo = props.feedInfo.item

  feedInfo = {
    ...feedInfo,
    commentContent: feedInfo.feedContent,
  }
  const feedId = feedInfo.feedId

  const [commentList, setCommentList] = useState([])

  const scrollViewRef = useRef()

  const getRes = async () => {
    try {
      const res = await instance.get(`/api/comment/${feedId}`)
      const newCommentList = res.data.commentList
      setCommentList(newCommentList)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    getRes()
  }, [])

  const [writedText, setWritedText] = useState("")

  const changeText = (e) => {
    setWritedText(e)
  }

  const submit = async () => {
    try {
      if (writedText) {
        const resPost = await instance.post("/api/comment", {
          feedId: feedId,
          commentContent: writedText,
        })
        const resGet = await instance.get(`/api/comment/${feedId}`)
        const newCommentList = resGet.data.commentList
        setCommentList(newCommentList)
        scrollViewRef.current?.scrollToEnd({ animated: true })
        setWritedText("")
      } else {
        return
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  const deleteComment = () => {
    getRes()
  }

  return (
    <Modal animationType="fade" statusBarTranslucent={true}>
      <Body behavior={"padding"}>
        <TopMargin></TopMargin>
        <TopView>
          <FirstColumn>
            <BackIconView onPress={close}>
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
          ref={scrollViewRef}
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
          {commentList?.map((commentInfo, idx) => (
            <CommentItem commentInfo={commentInfo} key={idx} deleteComment={deleteComment} />
          ))}
        </ScrollView>
        <TextInputView>
          {/* 오토포커스이슈 */}
          <CommentIconView elevation={5}>
            <Image
              source={myImg ? { uri: myImg } : { uri: defaultImageUri }}
              style={{ width: "100%", height: "100%", borderRadius: 45 }}
              resizeMode="cover"
            />
          </CommentIconView>
          <TextInput
            placeholder={"댓글을 입력하세요"}
            style={{
              elevation: 3,
              fontFamily: "HyeminRegular",
              fontSize: 18,
            }}
            value={writedText}
            onChangeText={changeText}
            onSubmitEditing={submit}
          />
        </TextInputView>
      </Body>
    </Modal>
  )
}

export default CommentArea

const Body = styled.KeyboardAvoidingView`
  flex: 1;
  width: 100%;
  background-color: ${ColorSet.paleBlueColor(0.2)};
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const CommentIconView = styled.View`
  width: ${windowWidth * 0.9 * 0.15}px;
  height: ${windowWidth * 0.9 * 0.15}px;
  border-radius: 45px;
  margin-right: 5px;
`

const TextInput = styled.TextInput`
  height: 45px;
  width: ${windowWidth * 0.9 * 0.83 - 10}px;
  border-radius: 10px;
  background-color: white;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: 5px;
`
