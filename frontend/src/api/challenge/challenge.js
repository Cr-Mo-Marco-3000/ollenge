import { AuthorizationInstance } from "../settings.js"

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

const ChallAPI = {
  scheduled,
  ongoing,
  ongoingRank,
}

export default ChallAPI
