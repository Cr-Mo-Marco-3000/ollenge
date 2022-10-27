import Orange from "./orange.png"
import { Image } from "react-native"

export function OrangeLogo() {
  return (
    <Image source={Orange} style={{ width: "100%" }} resizeMode="contain" />
  )
}
