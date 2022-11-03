import { AuthorizationInstance } from "../settings.js"

/**
 * 특정 댓글을 조회하는 API
 * - {@link https://www.notion.so/sieunwoo-ssafy/faadf821ef1e41a68cc75fda880bc777?v=f512f5feeb3f4a4cb132af57ab036582&p=1354339e450243a1b115a2a41350c1a6&pm=s API명세서(Notion) 링크}
 * @param {Object[]} data
 * @param {number} data[].feedId
 * @param {number} data[].userId
 */
export const getCmt = (data) => {
  const { feedId, userId } = data
  const instance = AuthorizationInstance()
  instance.get(`/feed/${feedId}/${userId}`)
}

/**
 * 특정 댓글을 삭제하는 API
 * - {@link https://www.notion.so/sieunwoo-ssafy/faadf821ef1e41a68cc75fda880bc777?v=f512f5feeb3f4a4cb132af57ab036582&p=e2eda5c4d8d74899b37809193d55a634&pm=s API명세서(Notion) 링크}
 * @param {Object[]} data
 * @param {number} data[].feedId
 * @param {number} data[].userId
 */
export const deleteCmt = (data) => {
  const { feedId, userId } = data
  const instance = AuthorizationInstance()
  instance.post(`/feed/${feedId}/${userId}`)
}

/**
 * 특정 댓글을 수정하는 API
 * - {@link https://www.notion.so/sieunwoo-ssafy/faadf821ef1e41a68cc75fda880bc777?v=f512f5feeb3f4a4cb132af57ab036582&p=e2eda5c4d8d74899b37809193d55a634&pm=s API명세서(Notion) 링크}
 * @param {Object[]} data
 * @param {number} data[].feedId
 * @param {number} data[].userId
 * @param {string} data[].content
 */
export const updateCmt = (data) => {
  const { feedId, userId } = data
  const instance = AuthorizationInstance()
  instance.post(`/feed/${feedId}/${userId}`, { data })
}

/**
 * [Feed > Comment] 피드 댓글 작성하는 API
 * - {@link https://www.notion.so/sieunwoo-ssafy/faadf821ef1e41a68cc75fda880bc777?v=f512f5feeb3f4a4cb132af57ab036582&p=198e3b2a89f9458094e4ad84080f74a1&pm=s API명세서(Notion) 링크}
 * @param {Object[]} data
 * @param {number} data[].feedId
 * @param {number} data[].userId
 * @param {string} data[].content
 */
export const uploadCmt = (data) => {
  const { feedId, userId } = data
  const instance = AuthorizationInstance()
  instance.post(`/feed/${feedId}/${userId}`, { data })
}

/**
 * [Feed] 목록 조회하는 API
 * - {@link https://www.notion.so/sieunwoo-ssafy/faadf821ef1e41a68cc75fda880bc777?v=f512f5feeb3f4a4cb132af57ab036582&p=f8bd31d966e5474f8c84cd14c8fee432&pm=s API명세서(Notion) 링크}
 */
export const getFeeds = (data) => {
  const { feedId, userId } = data
  const instance = AuthorizationInstance()
  instance.get(`/feed/${feedId}/${userId}`, { data })
}

const feedAPI = {
  getCmt,
  deleteCmt,
  updateCmt,
  uploadCmt,
  getFeeds,
}

export default feedAPI
