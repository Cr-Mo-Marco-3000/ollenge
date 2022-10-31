import React from "react"

import { KAKAO_API_KEY, BASE_URL } from "@env"
import { View } from "react-native"
import WebView from "react-native-webview"

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`

function KakaloLoginScreen() {
  const getCode = (target) => {
    const exp = "code="
    const condition = target.indexOf(exp)
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length)
      console.log(requestCode)
    }
  }
  return (
    <View style={{ flex: 1, paddingTop: 100, paddingHorizontal: 10, backgroundColor: "white" }}>
      <WebView
        style={{ flex: 1, justifyContent: "center" }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${BASE_URL}/api/oauth/kakao&response_type=code`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          const data = event.nativeEvent.url
          if (data) {
            getCode(data)
          }
        }}
      />
    </View>
  )
}
export default KakaloLoginScreen
