import React from "react"

import { KAKAO_API_KEY, BASE_URL } from "@env"
import { View } from "react-native"
import WebView from "react-native-webview"

import TopMargin from "../common/TopMargin"

// const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`
const INJECTED_JAVASCRIPT =
  '(function() {if(window.document.getElementsByTagName("pre").length>0){window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML));}})();'

function KakaloLoginScreen() {
  function getData(target) {
    const obj = JSON.parse(target)
    console.log(obj.accessToken)
  }
  return (
    <View style={{ flex: 1, paddingTop: 100, paddingHorizontal: 10, backgroundColor: "white" }}>
      <TopMargin />
      <WebView
        style={{ flex: 1, justifyContent: "center" }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${BASE_URL}/api/oauth/kakao&response_type=code`,
        }}
        scalesPageToFit={true}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled={true}
        onMessage={(event) => {
          const data = event.nativeEvent.data
          getData(data)
        }}
      />
    </View>
  )
}
export default KakaloLoginScreen
