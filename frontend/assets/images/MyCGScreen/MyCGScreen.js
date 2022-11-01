import Fire from "./fire-front-color.png"
import Pencil from "./pencil-front-color.png"
import Running from "./person_running_3d_light.png"
import Example from "./example.jpg"
import Crown from "./crown-front-color.png"

import { Image } from "react-native"
import { overlay } from "react-native-paper"

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

export function CrownIcon() {
  return <Image source={Crown} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
}
