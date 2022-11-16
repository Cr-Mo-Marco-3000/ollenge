import ConvertDate from "./ConvertDate"

function TodayCheck(lst) {
  const today = ConvertDate(new Date())
  console.log(new Date())
  const datetimeLst = []
  for (const datetime of lst) {
    const date = datetime.split(" ")[0]
    datetimeLst.push(date)
  }
  if (datetimeLst.includes(today)) {
    return true
  }
  return false
}
export default TodayCheck
