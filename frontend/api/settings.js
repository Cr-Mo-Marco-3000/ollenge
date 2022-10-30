import axios from "axios"

const BASE_URL = "localhost:3000/api"
// BASE_URL = "http://i7a501.p.ssafy.io/api"

const getToken = async () => {
  let tempToken = "아직 토큰이 없어요"
  //   try {
  //     await AsyncStorage.getItem("jwt").then((jwt) => {
  //       tempToken = jwt
  //     })
  //     if (tempToken) {
  //       return tempToken
  //     }
  //   } catch (e) {
  //     console.error(e)
  //   }
  return tempToken
}

/** { baseUrl: string } 데이터를 담고 있습니다 */
function createInstance() {
  const instance = axios.create({
    baseURL: BASE_URL,
  })
  return instance
}

function AuthorizationInstance() {
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
