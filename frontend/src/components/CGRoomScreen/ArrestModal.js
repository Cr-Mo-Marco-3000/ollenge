import React from "react-native"
import { Modal, TextInput } from "react-native"
import { useState } from "react"
import styled from "styled-components"
import AppCard from "../common/AppCard"
import AppButton from "../common/AppButton"
import AppBoldText from "../common/AppBoldText"
import { AuthorizationInstance } from "../../api/settings"
import { MegaphoneIcon } from "../../assets/images"
import ColorSet from "../../style/ColorSet"

const ArrestModal = (props) => {
  const [arrestState, setArrestState] = useState(1)
  const backToFeed = props.backToFeed
  const instance = AuthorizationInstance()
  const [arrestText, setArrestText] = useState("")
  const feedUserId = props.feedUserId

  const arrest = async () => {
    try {
      if (arrestState === 2) {
        const res = await instance.post("/api/user/report", {
          reportedUserId: feedUserId,
          reportContent: arrestText,
        })
        setArrestState(arrestState + 1)
      } else {
        setArrestState(arrestState + 1)
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <Modal animationType="fade" statusBarTranslucent={true} transparent={true}>
      <BackToFeed
        onPress={() => {
          backToFeed()
        }}
      >
        <CardView>
          <AppCard>
            {/* 2단계 */}
            {arrestState === 1 && (
              <CardInnerView>
                <RowView></RowView>
                <FirstTextView>
                  <ImageView>
                    <MegaphoneIcon />
                  </ImageView>
                  <AppBoldText pxSize={18}>신고 사유를 알려주세요</AppBoldText>
                </FirstTextView>
                <TextView>
                  <TextInput
                    style={{
                      width: "80%",
                      height: 50,
                      padding: 5,
                      fontFamily: "HyeminRegular",
                      fontSize: 17,
                    }}
                    underlineColorAndroid={ColorSet.navyColor(1)}
                    onChangeText={(e) => {
                      setArrestText(e)
                    }}
                  ></TextInput>
                </TextView>
                <ButtonView>
                  <ButtonInnerView>
                    <AppButton handler={arrest} color={"deepOrange"} title={"확인"} />
                  </ButtonInnerView>
                </ButtonView>
                <RowView></RowView>
              </CardInnerView>
            )}
            {arrestState === 2 && (
              <CardInnerView>
                <RowView></RowView>
                <RowView>
                  <MegaphoneIcon />
                </RowView>
                <TextView>
                  <AppBoldText pxSize={20}>정말 신고하시겠습니까?</AppBoldText>
                </TextView>
                <ButtonView>
                  <ButtonInnerView>
                    <AppButton handler={arrest} color={"deepOrange"} title={"신고"} />
                  </ButtonInnerView>
                </ButtonView>
                <RowView></RowView>
              </CardInnerView>
            )}
            {arrestState === 3 && (
              <CardInnerView>
                <RowView></RowView>
                <RowView>
                  <MegaphoneIcon />
                </RowView>
                <TextView>
                  <AppBoldText pxSize={20}>신고가 완료되었습니다!</AppBoldText>
                </TextView>
                <ButtonView>
                  <ButtonInnerView>
                    <AppButton handler={backToFeed} color={"deepOrange"} title={"확인"} />
                  </ButtonInnerView>
                </ButtonView>
                <RowView></RowView>
              </CardInnerView>
            )}
          </AppCard>
        </CardView>
      </BackToFeed>
    </Modal>
  )
}

export default ArrestModal

const BackToFeed = styled.Pressable`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`

const CardView = styled.View`
  width: 70%;
  height: 200px;
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
  height: 120%;
  width: 80%;
`
