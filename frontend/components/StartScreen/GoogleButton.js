import { View, Pressable, Text, StyleSheet } from "react-native"
import styled, { css } from "styled-components/native"
import { RFPercentage } from "react-native-responsive-fontsize"
import { GoogleLogo } from "../../assets/images"

function GoogleButton(props) {
  return (
    <ButtonContainer>
      <ButtonInnerContainer onPress={props.handler}>
        <View style={{ width: 40, height: 40, flex: 1 }}>
          <GoogleLogo />
        </View>
        <View style={{ flex: 5, alignItems: "center" }}>
          <Text style={{ fontSize: RFPercentage(2.6) }}>구글 로그인</Text>
        </View>
      </ButtonInnerContainer>
    </ButtonContainer>
  )
}
export default GoogleButton

const ButtonContainer = styled.View`
  background: white;
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
