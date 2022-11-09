import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

const DeviceInfo = {
  dw: width,
  dh: height,
}

export const dw = width
export const dh = height

export default DeviceInfo
