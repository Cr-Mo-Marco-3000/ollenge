function LocalTime() {
  const curr = new Date()
  const krTimeDiff = 9 * 60 * 60 * 1000
  const kr_curr = new Date(curr.getTime() + krTimeDiff)
  return kr_curr
}
export default LocalTime
