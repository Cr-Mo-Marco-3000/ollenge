import { DateTime } from "./index"

const CGStartFlag = function (startDate, endDate) {
  const now = new Date()
  const start = DateTime(startDate, "00:00:00")
  const end = DateTime(endDate, "23:59:59")
  if (now < start) {
    return "waiting"
  } else if (start <= now && now < end) {
    return "playing"
  } else if (end <= now) {
    return "end"
  }
}
export default CGStartFlag
