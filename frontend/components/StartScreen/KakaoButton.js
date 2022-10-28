import { View, Pressable, Text, StyleSheet } from "react-native"
import styled, { css } from "styled-components/native"
import { RFPercentage } from "react-native-responsive-fontsize"
import { KakaoLogo } from "../../assets/images"
import AppText from "../common/AppText"

function KakaoButton(props) {
  return (
    <ButtonContainer>
      <ButtonInnerContainer onPress={props.handler}>
        <View style={{ width: 40, height: 40, flex: 1 }}>
          <KakaoLogo />
        </View>
        <View style={{ flex: 5, alignItems: "center" }}>
          <AppText color={"black"}>카카오 로그인</AppText>
        </View>
      </ButtonInnerContainer>
    </ButtonContainer>
  )
}
export default KakaoButton

const ButtonContainer = styled.View`
  background: #fee500;
  width: 70%;
  margin-bottom: 5%;
  display: flex;
  border-radius: 12px;
  padding: 7px 10px;
  z-index: 1000;
`

const ButtonInnerContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  width: 100%;
`
