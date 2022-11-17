import { LocalTime, DateTime } from "./index"

const CGStartFlag = function (startDate, endDate) {
  const now = LocalTime()
  const start = DateTime(startDate, "00:00:00")
  const end = DateTime(endDate, "23:59:59")
  if (now < start) {
    return "waiting"
  } else if (start <= now < end) {
    return "playing"
  } else {
    return "end"
  }
}
export default CGStartFlag
