import React from "react-native"
import styled from "styled-components"
import { useContext, useState } from "react"
import { View, Image, Dimensions, Text } from "react-native"
import AppBoldText from "../common/AppBoldText"
import AppText from "../common/AppText"
import defaultImage from "../../assets/images/default-image.png"
import { AuthContext } from "../../../store/auth-context"
import { CrossIcon } from "../../assets/images"
import DeleteCommentModal from "./DeleteCommentModal"

const windowWidth = Dimensions.get("window").width

const CommentItem = (props) => {
  // ScrollView 내부에서, 고정되지 않는 높이의 child들을 사용할 때는, 무조건 flex1이다!!!!
  // 고정값으로 지정하면, 고정값으로밖에 렌더링 되지 않고, 다른 방식으로 먹이려 하면, 제대로 렌더링이 되지 않는다
  const defaultImageUri = Image.resolveAssetSource(defaultImage).uri
  const profileImg = props.commentInfo.profileImg
  const nickname = props.commentInfo.nickname
  const createdDatetime = props.commentInfo.createdDatetime
  const commentContent = props.commentInfo.commentContent
  const feedImg = props.commentInfo.feedImg
  const commentUserId = props.commentInfo.userId
  const commentId = props.commentInfo.commentId
  //
  const authCtx = useContext(AuthContext)
  const myUserId = authCtx.userInfo.userId

  const date = {
    year: createdDatetime.slice(0, 4),
    month: createdDatetime.slice(5, 7),
    day: createdDatetime.slice(8, 10),
    hour: createdDatetime.slice(11, 13),
    minute: createdDatetime.slice(14, 16),
  }
  // 시간 설정
  const intHour = parseInt(date.hour)

  let morningAfternoon = "오전"

  if (intHour === 0) {
    date.hour = "12"
  } else if (12 === intHour) {
    morningAfternoon = "오후"
  } else if (12 < intHour) {
    morningAfternoon = "오후"
    date.hour = (intHour - 12).toString()
  }

  const [openCancelModal, setOpenCancelModal] = useState(false)

  const deleteComment = props.deleteComment

  return (
    <CommentBody>
      {openCancelModal && (
        <DeleteCommentModal
          commentId={commentId}
          openCancelModal={() => {
            setOpenCancelModal(!openCancelModal)
          }}
          deleteComment={deleteComment}
        />
      )}
      <CommentBodyInner>
        {/* 좌측 */}
        <LeftColumn>
          <CommentIconView elevation={5}>
            <Image
              source={profileImg ? { uri: profileImg } : { uri: defaultImageUri }}
              style={{ width: "100%", height: "100%", borderRadius: 45 }}
              resizeMode="cover"
            />
          </CommentIconView>
        </LeftColumn>
        {/* 우측 */}
        <RightColumn>
          <CommentRow>
            {!feedImg ? (
              <AppText align="left" pxSize={14}>
                <MiddleText>{nickname} </MiddleText>
                {commentContent}
              </AppText>
            ) : (
              <AppText align="left" pxSize={14}>
                <MiddleText>{nickname} </MiddleText>
              </AppText>
            )}
          </CommentRow>
          <DateTimeRow>
            <AppText pxSize={13} color={"lightBlue"}>
              {date.year}년 {date.month}월 {date.day}일 {morningAfternoon} {date.hour}:{date.minute}
            </AppText>
            {!feedImg && myUserId === commentUserId && (
              <CancelIconView
                onPress={() => {
                  setOpenCancelModal(!openCancelModal)
                }}
              >
                <CrossIcon />
              </CancelIconView>
            )}
          </DateTimeRow>
        </RightColumn>
      </CommentBodyInner>
    </CommentBody>
  )
}

export default CommentItem

const CommentBody = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`

const CommentBodyInner = styled.View`
  width: 90%;
  height: 100%;
  flex-direction: row;
`

const CommentIconView = styled.View`
  width: ${windowWidth * 0.9 * 0.15}px;
  height: ${windowWidth * 0.9 * 0.15}px;
  border-radius: 45px;
`

const LeftColumn = styled.View`
  width: ${windowWidth * 0.9 * 0.2}px;
  align-items: center;
  justify-content: flex-start;
`

const RightColumn = styled.View`
  padding-left: 3px;
  padding-right: 3px;
  width: ${windowWidth * 0.9 * 0.8}px;
  justify-content: center;
`

const CommentRow = styled.View`
  width: 100%;
  align-items: flex-start;
  margin-bottom: 5px;
`

const MiddleText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-right: 5px;
  margin-top: 5px;
`

const DateTimeRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const CancelIconView = styled.Pressable`
  margin-left: 7px;
  height: 12px;
  width: 12px;
  justify-content: center;
  align-items: center;
  bottom: 1px;
  opacity: 0.7;
`
