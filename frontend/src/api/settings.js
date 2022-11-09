import axios from "axios"
import { BASE_URL } from "@env"
import AsyncStorage from "@react-native-async-storage/async-storage"

const TEMP_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaXNzIjoib2xsZW5nZS5jb20iLCJleHAiOjE2Njg2NDYwNzEsImlhdCI6MTY2NzM1MDA3MX0.RzAQkJst9HCND7a_sdZ_8POhjIJmJZE2TsJcvq3Iuj7CcE4ouQW6WN5DJ1RApYoGaowPGl2Dimk4fyOFxju1jQ"

const getToken = async () => {
  const token = (await AsyncStorage.getItem("token")) || TEMP_KEY
  if (token === TEMP_KEY) {
    console.log("-------------------------------------------------------------")
    console.log("|  AsyncStorage에서 token_key 값을 불러오는데 실패했습니다.  |")
    console.log("|        임시 토큰 값을 사용합니다. (홍제민's token)         |")
    console.log("-------------------------------------------------------------")
  }
  return token
}

/** { baseUrl: string } 데이터를 담고 있습니다 */
function createInstance() {
  const instance = axios.create({
    baseURL: BASE_URL,
  })
  return instance
}

async function AuthorizationInstance() {
  const instance = axios.create({
    baseURL: BASE_URL,
  })
  const token = await getToken()
  instance.defaults.headers.post["authorization"] = `Bearer ${token}`

  return instance
}

export { createInstance, AuthorizationInstance }
