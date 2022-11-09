import React from "react"

import Fire from "./fire-front-color.png"
import Pencil from "./pencil-front-color.png"
import Running from "./person_running_3d_light.png"
import Example from "./example.jpg"
import GoldCrown from "./gold-crown-icon.png"
import SilverCrown from "./silver-crown-icon.png"
import BronzeCrown from "./bronze-crown-icon.png"

import { Image } from "react-native"

export function RankingChallengeIcon() {
  return <Image source={Fire} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
}

export function NormalChallengeIcon() {
  return <Image source={Pencil} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
}

export function RunningIcon() {
  return <Image source={Running} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
}

export function ExampleIcon() {
  return (
    <Image
      source={Example}
      style={{ height: "100%", width: "100%", borderRadius: 200 * 0.7 * 0.95 * 0.75 }}
      resizeMode="cover"
    />
  )
}

export function CrownIcon(props) {
  const crown = {
    1: <Image source={GoldCrown} style={{ height: "100%", width: "100%" }} resizeMode="contain" />,
    2: (
      <Image source={SilverCrown} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
    ),
    3: (
      <Image source={BronzeCrown} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
    ),
  }
  return crown[props.rank]
}
