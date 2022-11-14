import React, { Dimensions, Image, Pressable, KeyboardAvoidingView, Modal } from "react-native"
import { useState } from "react"
import AppCard from "../common/AppCard"
import styled from "styled-components"
import AppBoldText from "../../components/common/AppBoldText"
import AppText from "../../components/common/AppText"
import defaultImage from "../../assets/images/default-image.png"
import { CommentIcon } from "../../assets/images"
import AppModal from "../../components/common/AppModal"
import CommentArea from "./CommentArea"

const windowWidth = Dimensions.get("window").width

const FeedItem = (props) => {
  const [openModal, setOpenModal] = useState(true)

  const feedInfo = props.feedInfo
  const defaultImageUri = Image.resolveAssetSource(defaultImage).uri
  const profileImg = feedInfo.item.profileImg
  const nickname = feedInfo.item.nickname
  const createdDatetime = feedInfo.item.createdDatetime
  const feedImg = feedInfo.item.feedImg
  const commentNum = feedInfo.item.commentNum
  const feedContent = feedInfo.item.feedContent
  const whenClosed = props.whenClosed

  const openAndClose = () => {
    whenClosed()
    setOpenModal(!openModal)
  }

  return (
    <FeedDistrict>
      {!openModal && (
        <Modal animationType="fade" statusBarTranslucent={true}>
          <CommentArea openAndClose={openAndClose} feedInfo={props.feedInfo} />
        </Modal>
      )}
      <CardView>
        <AppCard>
          <InnerCard>
            <ContentCard>
              <TitleRow>
                <UserImageView elevation={3}>
                  <Image
                    source={profileImg ? { uri: profileImg } : { uri: defaultImageUri }}
                    style={{ width: "100%", height: "100%", borderRadius: 45 }}
                    resizeMode="cover"
                  />
                </UserImageView>
                <UserView>
                  <UserNameView>
                    <AppBoldText align={"left"} pxSize={20}>
                      {nickname}
                    </AppBoldText>
                  </UserNameView>
                  <DateTimeView>
                    <AppText align={"left"} pxSize={15}>
                      {createdDatetime}
                    </AppText>
                  </DateTimeView>
                </UserView>
              </TitleRow>
              <ImageRow>
                <FeedImage elevation={7}>
                  <Image
                    source={feedImg ? { uri: feedImg } : { uri: defaultImageUri }}
                    style={{ width: "100%", height: "100%", borderRadius: 20 }}
                    resizeMode="cover"
                  />
                </FeedImage>
              </ImageRow>
              <TextRow>
                <Pressable style={{ width: "100%", height: "100%" }} onPress={openAndClose}>
                  <FeedTextRow>
                    <AppText
                      style={{
                        width: "100%",
                      }}
                      pxSize={18}
                      lineNumber={1}
                      align={"left"}
                    >
                      {feedContent}
                    </AppText>
                  </FeedTextRow>
                  <FeedCommentRow>
                    <CommentImage>
                      <CommentIcon />
                    </CommentImage>
                    <AppText pxSize={14} color="lightBlue">
                      {commentNum ? `댓글 ${commentNum}개 모두 보기` : "아직 댓글이 없습니다"}
                    </AppText>
                  </FeedCommentRow>
                </Pressable>
              </TextRow>
            </ContentCard>
          </InnerCard>
        </AppCard>
      </CardView>
    </FeedDistrict>
  )
}

export default FeedItem

const FeedDistrict = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 350px;
`
const CardView = styled.View`
  width: 90%;
  height: 90%;
`

const InnerCard = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const ContentCard = styled.View`
  width: 90%;
  height: 90%;
  justify-content: space-between;
  align-items: center;
`
const TitleRow = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
`
const UserImageView = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`

const UserView = styled.View`
  height: 90%;
  width: ${windowWidth * 0.9 * 0.9 - 60}px;
  left: 10px;
`
const UserNameView = styled.View`
  justify-content: flex-end;
`

const DateTimeView = styled.View`
  justify-content: flex-start;
`

const ImageRow = styled.View`
  height: 170px;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const FeedImage = styled.View`
  height: 170px;
  border-radius: 20px;
  width: 100%;
`

const TextRow = styled.View`
  padding-left: 5px;
  padding-right: 5px;
  height: 40px;
  width: 100%;
  justify-content: space-between;
`

const FeedTextRow = styled.View`
  flex: 5;
  justify-content: center;
`

const FeedCommentRow = styled.View`
  top: 3px;
  width: 100%;
  flex: 5;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

const CommentImage = styled.View`
  width: 20px;
  height: 100%;
`
