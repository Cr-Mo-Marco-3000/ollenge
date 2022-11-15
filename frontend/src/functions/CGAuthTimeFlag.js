import { LocalTime } from "./index"

const CGAuthTimeFlag = function (startTime, endTime) {
  if (startTime && endTime) {
    const today = new Date()
    const now = 60 * today.getHours() + today.getMinutes()
    const start = 60 * Number(startTime.substring(0, 2)) + Number(startTime.substring(3, 5))
    const end = 60 * Number(endTime.substring(0, 2)) + Number(endTime.substring(3, 5))

    if (now < start) {
      return "waiting"
    } else if (start <= now < end) {
      return "playing"
    } else {
      return "end"
    }
  }
  return
}
export default CGAuthTimeFlag
