import React from "react-native"
import styled from "styled-components"
import { View, Image, Dimensions } from "react-native"
import AppBoldText from "../common/AppBoldText"
import AppText from "../common/AppText"
import defaultImage from "../../assets/images/default-image.png"

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
  return (
    <CommentBody>
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
          <CommentInfoRow>
            <View
              style={{
                alignItems: "flex-start",
              }}
            >
              <AppBoldText lineNumber={1} pxSize={20}>
                {nickname}
              </AppBoldText>
              <AppBoldText color="lightBlue" lineNumber={1} pxSize={15}>
                {createdDatetime}
              </AppBoldText>
            </View>
            {!feedImg && (
              <View
                style={{
                  marginTop: 5,
                }}
              >
                <AppText align={"left"} size={2}>
                  {commentContent}
                </AppText>
              </View>
            )}
          </CommentInfoRow>
          <View></View>
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
  width: ${windowWidth * 0.9 * 0.2}px;
  height: ${windowWidth * 0.9 * 0.2}px;
`
const LeftColumn = styled.View`
  width: ${windowWidth * 0.9 * 0.2 + 10}px;
  align-items: center;
  justify-content: flex-start;
`

const RightColumn = styled.View`
  width: ${windowWidth * 0.9 * 0.8 - 10}px;
  justify-content: center;
  /* background-color: red; */
`

const CommentInfoRow = styled.View`
  width: 100%;
  align-items: flex-start;
`
