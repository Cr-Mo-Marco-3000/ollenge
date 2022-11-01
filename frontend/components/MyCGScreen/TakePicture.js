import React, { useState, useEffect } from "react"

import { Pressable, View, StyleSheet, Text, Button, Image, TextInput } from "react-native"
import { Camera } from "expo-camera"
import axios from "axios"
import { decode as atob, encode as btoa } from "base-64"

function TakePicture(props) {
  const participationId = 2
  const methodNum = 2
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [camera, setCamera] = useState(null)
  const [image, setImage] = useState(null) // 사진 uri
  const [base64, setBase64] = useState(null) // 사진 base64
  const [text, onChangeText] = useState("i'm feed") // 텍스트
  const [type, setType] = useState(Camera.Constants.Type.back)
  const BaseUrl = "https://dc75-211-192-210-232.jp.ngrok.io"
  const urlType = ["/auth/stdimg", "/auth/feature", "/auth/classification", "/auth/common"]

  useEffect(() => {
    ;(async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      setHasCameraPermission(cameraStatus.status === "granted")
    })()
  }, [])

  const takePicture = async () => {
    // console.log("hi")
    if (camera) {
      const options = { quality: 0.5, base64: true }
      let photo = await camera.takePictureAsync(options)
      setImage(photo.uri)
      // console.log(photo)
      setBase64(photo.base64)
      // console.log("hihi")
      // const file = dataURLtoFile("data:image/jpeg;base64," + imbase)
      // formData.set("file", file)
    }
  }
  const createAuthImg = async () => {
    const dataForm = [
      { participation_id: String(participationId), std_img: base64 },
      { participation_id: String(participationId), feed_img: base64, feed_content: text },
      {
        participation_id: String(participationId),
        feed_img: base64,
        feed_content: text,
        classification_keyword: "laptop",
      },
      { participation_id: String(participationId), feed_img: base64, feed_content: text },
      { participation_id: String(participationId), feed_img: base64, feed_content: text },
    ]
    await axios({
      method: "post",
      url: BaseUrl + urlType[methodNum],
      headers: {
        "content-type": "application/json",
      },
      data: dataForm[methodNum],
    })
      .then((res) => {
        console.log(res.status, res.data.message)
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
