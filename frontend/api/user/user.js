import { createInstance, AuthorizationInstance } from "../settings.js"

/**
 * 회원가입 요청하는 API입니다.
 * @param {Object[]} data
 * @param {number} data[].authCode - Social 로그인 인가 코드
 * @param {string} data[].nickname 유저 닉네임
 * @param {string} data[].loginType Social 로그인 인가 코드 (google or kakao)
 * @param {string} [data[].profileImage] 유저 프로필 이미지 (선택)
 */
export const signup = (data) => {
  const instance = createInstance()
  instance.post("/user", { data })
}

/**
 * 전체 유저 랭킹 Top 100을 요청하는 API입니다. (입력값 없음)
 * - {@link https://www.notion.so/sieunwoo-ssafy/faadf821ef1e41a68cc75fda880bc777?v=f512f5feeb3f4a4cb132af57ab036582&p=03ddb02bc754448c9bdc08b360db275f&pm=s API명세서(Notion) 링크}
 */
export const ranking = () => {
  const instance = AuthorizationInstance()
  instance.get("/user/ranking")
}

/**
 * 특정 유저의 참여 완료 챌린지를 조회합니다.
 * @param {number} userId
 * - {@link https://www.notion.so/sieunwoo-ssafy/faadf821ef1e41a68cc75fda880bc777?v=f512f5feeb3f4a4cb132af57ab036582&p=d71dc54bc51d43efb4969f6d45b687a2&pm=s API명세서(Notion) 링크}
 */
export const completed = (userId) => {
  const instance = AuthorizationInstance()
  instance.get(`/user/completed/${userId}`)
}

/**
 * 특정 유저의 참여 예정 챌린지를 조회합니다.
 * - {@link https://www.notion.so/sieunwoo-ssafy/faadf821ef1e41a68cc75fda880bc777?v=f512f5feeb3f4a4cb132af57ab036582&p=280aa1515916423db098b4c61a9efc40&pm=s API명세서(Notion) 링크}
 * @param {number} userId
 */
export const scheduled = (userId) => {
  const instance = AuthorizationInstance()
  instance.get(`/user/scheduled/${userId}`)
}

/**
 * 특정 유저의 참여 중인 챌린지를 조회합니다.
 * - {@link https://www.notion.so/sieunwoo-ssafy/faadf821ef1e41a68cc75fda880bc777?v=f512f5feeb3f4a4cb132af57ab036582&p=811646198fd244aebba5d790f7fa6a39&pm=s API명세서(Notion) 링크}
 * @param {number} userId
 */
export const ongoing = (userId) => {
  const instance = AuthorizationInstance()
  instance.get(`/user/ongoing/${userId}`)
}

/**
 * 특정 유저를 신고합니다.
 * - {@link https://www.notion.so/sieunwoo-ssafy/faadf821ef1e41a68cc75fda880bc777?v=f512f5feeb3f4a4cb132af57ab036582&p=699b7d7a67234e87aa42e6ae8c99b22d&pm=s API명세서(Notion) 링크}
 * @param {Object[]} data
 * @param {number} data[].reportUserId
 * @param {number} data[].reportedUserId
 * @param {string} [data[].reportContent]
 */
export const report = (data) => {
  const instance = AuthorizationInstance()
  instance.get("/user/report", { data })
}

/**
 * 특정 유저의 정보를 조회합니다.
 * - {@link https://www.notion.so/sieunwoo-ssafy/faadf821ef1e41a68cc75fda880bc777?v=f512f5feeb3f4a4cb132af57ab036582&p=fcde7dbfb0f14fb1962c5783905d5627&pm=s API명세서(Notion) 링크}
 * @param {number} userId
 */
export const info = (userId) => {
  const instance = AuthorizationInstance()
  instance.get(`/user/${userId}`)
}

/**
 * 회원가입 요청하는 API입니다.
 * @param {Object[]} data
 * @param {number} data[].userId - 유저 아이디
 * @param {string} data[].nickname - 유저 닉네임
 * @param {string} [data[].profileImage] - 유저 프로필 이미지 (선택)
 * @param {string} [data[].userDescription] - 우저 본인 소개글 (선택)
 */
export const update = (data) => {
  const instance = createInstance()
  instance.patch("/user", { data })
}

/** 로그인 API는 아직 미완성 */

const userAPI = {
  signup,
  ranking,
  completed,
  scheduled,
  ongoing,
  report,
  info,
  update,
}

export default userAPI
