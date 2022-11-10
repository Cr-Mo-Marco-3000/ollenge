/**
 * @param {Date} date
 * 날짜 정보 str (ex, new Date())
 * @return 2022-11-10
 */

function ConvertDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  month = month >= 10 ? month : "0" + month
  var day = date.getDate()
  day = day >= 10 ? day : "0" + day
  return [year, month, day].join("-")
}
export default ConvertDate
