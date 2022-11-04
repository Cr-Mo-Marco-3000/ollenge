import React, { useContext } from "react"

import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import { View } from "react-native"
import styled from "styled-components/native"
import { useNavigation } from "@react-navigation/native"
import { createInstance } from "../../api/settings"

import { EXPO_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env"
import { GoogleLogo } from "../../assets/images"
import AppText from "../common/AppText"
import { AuthContext } from "../../../store/auth-context"

WebBrowser.maybeCompleteAuthSession()

function GoogleButton(props) {
  const navigation = useNavigation()
  const instance = createInstance()
  const authCtx = useContext(AuthContext)

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
  })

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response
      const accessToken = response.authentication.accessToken
      instance.get("/oauth/google", { params: { accessToken: accessToken } }).then((res) => {
        authCtx.authenticate(res.data.accessToken)
        if (res.data.userFlag) {
          authCtx.signed(true)
          props.startScreenChange()
        } else {
          navigation.push("Signup")
        }
      })
    }
  }, [response])

  return (
    <ButtonContainer>
      <ButtonInnerContainer
        disabled={!request}
        onPress={() => {
          promptAsync()
        }}
      >
        <View style={{ width: 40, height: 40, flex: 1 }}>
          <GoogleLogo />
        </View>
        <View style={{ flex: 5, alignItems: "center" }}>
          <AppText color={"black"}>구글 로그인</AppText>
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
