import React, { useState, useEffect } from "react"

import { Pressable, View, StyleSheet, Text, Button, Image, TextInput } from "react-native"
import { Camera } from "expo-camera"
import axios from "axios"
import { decode as atob, encode as btoa } from "base-64"

function TakePicture(props) {
  const participationId = 3 // prop으로 participation_id 가져오고
  const methodNum = 1 // 인증 방식에 대하여, {0: std_img 등록, 1: feature 비교, 2: classification 3: common}
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [camera, setCamera] = useState(null)
  const [image, setImage] = useState(null) // 사진 uri
  const [stdimg, setStdimg] = useState(null)
  const [base64, setBase64] = useState(null) // 사진 base64
  const [text, onChangeText] = useState("i'm feed") // 텍스트 기본 문구 설정 해야함
  const [type, setType] = useState(Camera.Constants.Type.back)
  const BaseUrl = "https://39c3-211-192-210-232.jp.ngrok.io" // BaseUrl 설정 해야함
  const urlType = ["/auth/stdimg", "/auth/feature", "/auth/classification", "/auth/common"]

  useEffect(async () => {
    ;(async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      setHasCameraPermission(cameraStatus.status === "granted")
    })()
    if (methodNum == 1) {
      //기준 이미지 불러오기
      await axios({
        method: "get",
        url: BaseUrl + "/auth/isstdimg/" + participationId.toString(),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          setStdimg(res.data.stdimg)
        })
        .catch((error) => {
          console.log(error.response.data.errcode)
        })
    }
  }, [])

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true }
      let photo = await camera.takePictureAsync(options)
      setImage(photo.uri)
      setBase64(photo.base64)
    }
  }
  const createAuthImg = async () => {
    const dataForm = [
      { participation_id: participationId, std_img: base64 },
      { participation_id: participationId, feed_img: base64, feed_content: text },
      {
        participation_id: participationId,
        feed_img: base64,
        feed_content: text,
        classification_keyword: "laptop", // 나중에 keyword 입력 해야함
      },
      { participation_id: participationId, feed_img: base64, feed_content: text },
      { participation_id: participationId, feed_img: base64, feed_content: text },
    ]
    await axios({
      method: "post",
      url: BaseUrl + urlType[methodNum],
      headers: {
        "content-type": "application/json",
        authorization:
          "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaXNzIjoib2xsZW5nZS5jb20iLCJleHAiOjE2Njg2NDYwNzEsImlhdCI6MTY2NzM1MDA3MX0.RzAQkJst9HCND7a_sdZ_8POhjIJmJZE2TsJcvq3Iuj7CcE4ouQW6WN5DJ1RApYoGaowPGl2Dimk4fyOFxju1jQ",
      },
      data: dataForm[methodNum],
    })
      .then((res) => {
        // 생성 완료시 빠져나가는 코드
        onChangeText("i'm feed")
        setImage(null)
      })
      .catch((error) => {
        console.log(error.response.data.errcode)
        //실패시 err 코드에 따라 출력해 주고
        setImage(null) // 사진 날리고 다시 사진 부터
      })
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>
  }
  return (
    <View style={{ flex: 1 }}>
      {!image ? (
        <View style={{ flex: 1 }}>
          <View style={styles.cameraContainer}>
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
              ratio={"1:1"}
            />
          </View>
          <Button title="Take Picture" onPress={() => takePicture()} />
          {stdimg ? <Image source={{ uri: stdimg }} style={{ flex: 1 }} /> : <View></View>}
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Image source={{ uri: image }} style={{ flex: 1 }} />
          <Button title="Create Feed" onPress={() => createAuthImg()} />
          <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})
export default TakePicture
