import { Alert } from "react-native"
import { AuthorizationInstance } from "../settings.js"
import { BASE_URL } from "../../getEnv"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
/**
 * [Challenge] 모집 중인 랭킹 챌린지 조회 (입력값 없음)
 * - {@link https://www.notion.so/sieunwoo-ssafy/faadf821ef1e41a68cc75fda880bc777?v=f512f5feeb3f4a4cb132af57ab036582&p=c316bb7646c244dea824c4de20c0a52f&pm=s API명세서(Notion) 링크}
 */
export const scheduled = () => {
  const instance = AuthorizationInstance()
  instance.get("/challenge/scheduled")
}

/**
 * [Challenge] 진행 중인 랭킹 챌린지 조회 API
 * - {@link https://www.notion.so/sieunwoo-ssafy/faadf821ef1e41a68cc75fda880bc777?v=f512f5feeb3f4a4cb132af57ab036582&p=90357a79aac6428e8cb10b8f4e7959da&pm=s API명세서(Notion) 링크}
 * @param {number} userId
 */
export const ongoing = (userId) => {
  const instance = AuthorizationInstance()
  instance.get(`/challenge/ongoing/${userId}`)
}

/**
 * [Challenge] 챌린지 정보 조회 API
 * - {@link https://www.notion.so/sieunwoo-ssafy/faadf821ef1e41a68cc75fda880bc777?v=f512f5feeb3f4a4cb132af57ab036582&p=a3ddf9ccf03242ab917fcebf926737e7&pm=s API명세서(Notion) 링크}
 * @param {Object[]} data
 * @param {number} data[].challengeId
 */
export const ongoingRank = (challengeId) => {
  const instance = AuthorizationInstance()
  instance.get(`/challenge/ongoing/${challengeId}`)
}

/**
 * API 호출 필수 요소들이 모두 있는지 테스팅 하는 코드
 * @param {Object[string]} rList
 * @param {Objct[any]} data
 */
const checkRequired = (rList, data) => {
  rList.forEach((required) => {
    if (data[`${required}`] === "") {
      return false
    }
  })
  return true
}

const requiredList = [
  "challengeName",
  "challengeTopic",
  "startDate",
  "endDate",
  "startTime",
  "endTime",
]

export const createCG = async (info) => {
  console.log("[ChallAPI.js] 챌린지 생성 API 시작")
  const instance = await AuthorizationInstance()

  if (checkRequired(requiredList, info) !== true) {
    Alert.alert({ title: "Input Error", message: "입력하지 않은 정보가 있습니다." })
  }

  const data = {}
  Object.keys(info).map((key) => {
    if (info[key] !== "") {
      data[key] = info[key]
    }
  })

  instance
    .post("/api/challenge", info)
    .then((res) => {
      console.log("[ChallAPI.js] 챌린지 생성 API => 성공")
      console.log(res.data)
    })
    .catch((err) => {
      console.log("[ChallAPI.js] 챌린지 생성 API => 실패")
      console.log(err.response.data)
    })
}

const challAPI = {
  scheduled,
  ongoing,
  ongoingRank,
  createCG,
}

export default challAPI
