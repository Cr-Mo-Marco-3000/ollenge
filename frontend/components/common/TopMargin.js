import React from "react"

import { NativeModules, View, StatusBar } from "react-native"
import { useEffect, useState } from "react"

const { StatusBarManager } = NativeModules

function TopMargin() {
  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height)
        })
      : setStatusBarHeight(StatusBar.currentHeight)
  }, [])

  const [statusBarHeight, setStatusBarHeight] = useState(0)

  return <View style={{ height: statusBarHeight }}></View>
}
export default TopMargin
