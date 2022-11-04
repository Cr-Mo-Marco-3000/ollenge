import React from "react"

import Orange from "./orange.png"
import Google from "./google-icon.png"
import Kakao from "./kakao-icon.png"
import Plus from "./plus-icon.png"
import Defalut from "./default-image.png"
import Pencil from "./pencil-icon.png"
import Heart1 from "./heart-icon-1.png"
import Heart2 from "./heart-icon-2.png"
import Heart3 from "./heart-icon-3.png"
import Heart4 from "./heart-icon-4.png"

import { Image } from "react-native"

import Triangle from "./triangle-icon.png"
import Triangle2 from "./triangle-icon2.png"

export function OrangeLogo() {
  return <Image source={Orange} style={{ width: "100%", zIndex: -1 }} resizeMode="contain" />
}

export function KakaoLogo() {
  return <Image source={Kakao} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
}

export function GoogleLogo() {
  return <Image source={Google} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
}

export function PlusIcon() {
  return <Image source={Plus} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
}

export function DefaultImage() {
  return (
    <Image
      source={Defalut}
      style={{ width: "100%", height: "100%", borderRadius: 100 }}
      resizeMode="cover"
    />
  )
}

export function PencilIcon() {
  return <Image source={Pencil} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
}

export function HeartIcon1() {
  return <Image source={Heart1} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
}

export function HeartIcon2() {
  return <Image source={Heart2} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
}

export function HeartIcon3() {
  return <Image source={Heart3} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
}
export function HeartIcon4() {
  return <Image source={Heart4} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
}

export function TriangleIcon() {
  return <Image source={Triangle} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
}

export function TriangleIcon2() {
  return <Image source={Triangle2} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
}
