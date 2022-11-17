function LocalTime() {
  const curr = new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  return new Date(curr)
}
export default LocalTime
