import React from "react-native"
import { Modal, TextInput } from "react-native"
import { useState } from "react"
import styled from "styled-components"
import AppCard from "../common/AppCard"
import AppButton from "../common/AppButton"
import AppBoldText from "../common/AppBoldText"
import { AuthorizationInstance } from "../../api/settings"
import { CrossIcon, CheckIcon } from "../../assets/images"
import ColorSet from "../../style/ColorSet"

const DeleteCommentModal = (props) => {
  const openCancelModal = props.openCancelModal
  const instance = AuthorizationInstance()
  const commentId = props.commentId
  const [modalState, setModalState] = useState(1)

  const deleteComment = async () => {
    try {
      if (modalState === 1) {
        setModalState(modalState + 1)
        const res = await instance.delete(`/api/comment/${commentId}`)
        props.deleteComment()
      } else {
        openCancelModal()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal animationType="fade" statusBarTranslucent={true} transparent={true}>
      <BackToFeed
        onPress={() => {
          openCancelModal()
        }}
      >
        <CardView>
          <AppCard>
            <CardInnerView>
              <RowView></RowView>
              <RowView>
                {modalState === 1 && <CrossIcon />}
                {!(modalState === 1) && <CheckIcon />}
              </RowView>
              <TextView>
                {modalState === 1 && (
                  <AppBoldText pxSize={20}>댓글을 삭제하시겠습니까?</AppBoldText>
                )}
                {!(modalState === 1) && (
                  <AppBoldText pxSize={20}>댓글이 삭제되었습니다!</AppBoldText>
                )}
              </TextView>
              <ButtonView>
                <ButtonInnerView>
                  {modalState === 1 && (
                    <AppButton handler={deleteComment} color={"deepOrange"} title={"삭제"} />
                  )}

                  {!(modalState === 1) && (
                    <AppButton handler={deleteComment} color={"deepOrange"} title={"확인"} />
                  )}
                </ButtonInnerView>
              </ButtonView>
              <RowView></RowView>
            </CardInnerView>
          </AppCard>
        </CardView>
      </BackToFeed>
    </Modal>
  )
}

export default DeleteCommentModal

const BackToFeed = styled.Pressable`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`

const CardView = styled.View`
  width: 80%;
  height: 250px;
`

const CardInnerView = styled.View`
  width: 100%;
  height: 100%;
`

const RowView = styled.View`
  justify-content: center;
  flex: 1;
`

const FirstTextView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const ImageView = styled.View`
  height: 40px;
  width: 40px;
  margin-right: 5px;
`

const TextView = styled(RowView)`
  flex: 1;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`
const ButtonView = styled(RowView)`
  flex: 1;
  align-items: center;
`

const ButtonInnerView = styled.View`
  height: 100%;
  width: 70%;
`
