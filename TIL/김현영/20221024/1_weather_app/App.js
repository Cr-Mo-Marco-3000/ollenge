import { StatusBar } from "expo-status-bar"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native"
import * as Location from "expo-location"
import React, { useState, useEffect } from "react"
import { API_KEY } from "@env"
// expo로 빌드할 경우, 설치되는 아이콘 패키지
// https://icons.expo.fyi/ 참고
import { Fontisto } from "@expo/vector-icons"

const { width: SCREEN_WIDTH, height } = Dimensions.get("window")

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
}

export default function App() {
  const [ok, setOk] = useState(true)
  const [city, setCity] = useState("Loading...")
  const [days, setDays] = useState([])
  const getWeather = async () => {
    // 위치 같은 정보를 받으려면, 무조건 유저의 허락을 받아야 한다.
    const { granted } = await Location.requestForegroundPermissionsAsync()
    if (!granted) {
      setOk(false)
    } else {
      // 현재 위치(위도, 경도)를 가져옴
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 })
      // 위도, 경도를 가지고, 사람이 읽을 수 있는 주소로 반환
      const location = await Location.reverseGeocodeAsync(
        {
          latitude,
          longitude,
        },
        { useGoogleMaps: false }
      )
      // console.log(location[0])
      setCity(location[0].region)
      const response = await fetch(
        // 정책 변화로, 최신 버전인 3.0은 동작하지 않는다. 2.5로 하자
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}&units=metric`
      )
      const json = await response.json()
      setDays(json.daily)
      console.log(json)
    }
  }

  useEffect(() => {
    getWeather()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="inverted"></StatusBar>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      {/* ScrollView에서는, style 대신 contentContainerStyle을 쓴다. */}
      <ScrollView
        horizontal
        // 자유 스크롤이 아닌, 페이지 형식으로 넘어간다.
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {!days?.length ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{ marginTop: 10 }}
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View
              key={index}
              style={styles.day}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={68}
                  color="black"
                />
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "",
    flex: 1,
    backgroundColor: "red",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 40,
    marginTop: 50,
    fontWeight: "500",
  },
  weather: {
    // scrollView는 화면 이상으로 나아가야 하기 때문에, flex로 사이즈를 지정해 주지 않는다.
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temperature: {
    fontSize: 130,
  },
  description: {
    marginTop: -70,
    fontSize: 50,
  },
  tinyText: {
    fontSize: 20,
  },
})
