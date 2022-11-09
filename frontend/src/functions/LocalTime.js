function LocalTime() {
  const curr = new Date()
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000
  const krTimeDiff = 9 * 60 * 60 * 1000
  const kr_curr = new Date(utc + krTimeDiff)
  return kr_curr
}
export default LocalTime
