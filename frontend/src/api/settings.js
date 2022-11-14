import axios from "axios"
import { BASE_URL } from "@env"
import AsyncStorage from "@react-native-async-storage/async-storage"

// const BASE_URL = BU + "/api"
// BASE_URL = "http://i7a501.p.ssafy.io/api"

const getToken = async () => {
  let tempToken = await AsyncStorage.getItem("token")
  return tempToken
}

/** { baseUrl: string } 데이터를 담고 있습니다 */
const createInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
  })
  return instance
}

const AuthorizationInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
  })

  instance.defaults.headers.post["Content-Type"] = "multipart/form-data"
  instance.interceptors.request.use(
    async function (config) {
      const accToken = await getToken()
      const token = "Bearer " + accToken

      config.headers = {
        Authorization: token,
      }
      return config
    },
    function (error) {
      // 오류 요청을 보내기전 수행할 일
      // ...
      return Promise.reject(error)
    },
  )

  return instance
}

export { createInstance, AuthorizationInstance }
