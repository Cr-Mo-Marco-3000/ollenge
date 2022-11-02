import React from "react"
import { Image } from "react-native"

import Gym from "./gym-icon.png"
import Notebook from "./notebook-icon.png"
import Sun from "./sun-icon.png"
import Boy from "./boy-icon.png"

export function GymIcon() {
  return (
    <Image
      source={Gym}
      style={{
        position: "absolute",
        height: "160%",
        width: "160%",
        opacity: 0.5,
        transform: [{ rotate: "-54.67deg" }],
        left: "-15%",
        top: "-15%",
      }}
      resizeMode="contain"
    />
  )
}
export function NotebookIcon() {
  return (
    <Image
      source={Notebook}
      style={{
        opacity: 0.5,
        width: "110%",
        height: "110%",
        position: "absolute",
        bottom: "-12%",
        left: "5%",
      }}
      resizeMode="contain"
    />
  )
}
export function SunIcon() {
  return (
    <Image
      source={Sun}
      style={{
        opacity: 0.5,
        width: "150%",
        height: "150%",
        position: "absolute",
        left: "-14%",
        top: "-15%",
      }}
      resizeMode="contain"
    />
  )
}

export function BoyIcon() {
  return (
    <Image
      source={Boy}
      style={{
        height: "100%",
        width: "100%",
      }}
      resizeMode="contain"
    />
  )
}
