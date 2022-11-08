import React from "react"
import { Image } from "react-native"

import Gym from "./gym-icon.png"
import Notebook from "./notebook-icon.png"
import Sun from "./sun-icon.png"
import Boy from "./boy-icon.png"

import Calendar from "./calendar_icon.png"
import GreenSquare from "./green_square_icon.png"
import Hand from "./hand_icon.png"
import OrangeSquare from "./orange_square_icon.png"
import Stopwatch from "./stopwatch_icon.png"

export function GymIcon(props) {
  const left = props.left ? props.left : "-7%"
  const top = props.top ? props.top : "-15%"

  return (
    <Image
      source={Gym}
      style={{
        position: "absolute",
        height: "160%",
        width: "160%",
        opacity: 0.5,
        transform: [{ rotate: "-54.67deg" }],
        left: left,
        top: top,
      }}
      resizeMode="contain"
    />
  )
}
export function NotebookIcon(props) {
  const left = props.left ? props.left : "5%"
  const top = props.top ? props.top : 0
  return (
    <Image
      source={Notebook}
      style={{
        opacity: 0.5,
        width: "110%",
        height: "110%",
        position: "absolute",
        top: top,
        left: left,
      }}
      resizeMode="contain"
    />
  )
}
export function SunIcon(props) {
  const left = props.left ? props.left : "-10%"
  const top = props.top ? props.top : "-10%"

  return (
    <Image
      source={Sun}
      style={{
        opacity: 0.5,
        width: "150%",
        height: "150%",
        position: "absolute",
        left: left,
        top: top,
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

export function CalendarIcon() {
  return <Image source={Calendar} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
}
export function GreenSquareIcon() {
  return (
    <Image source={GreenSquare} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
  )
}
export function HandIcon() {
  return <Image source={Hand} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
}
export function OrangeSquareIcon() {
  return (
    <Image source={OrangeSquare} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
  )
}
export function StopwatchIcon() {
  return <Image source={Stopwatch} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
}
