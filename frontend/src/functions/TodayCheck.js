import ConvertDate from "./ConvertDate"

function TodayCheck(lst) {
  let flag = false
  if (lst.length !== 0 && lst[0] !== null) {
    const lastCheck = lst[lst.length - 1]
    const lastDate = lastCheck.split(" ")
    const today = ConvertDate(new Date())
    console.log(lastDate, today)
    if (lastDate[0] == today) {
      flag = true
    }
  }
  return flag
}
export default TodayCheck
