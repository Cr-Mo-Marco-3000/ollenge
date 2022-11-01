import React, { useState, useEffect } from "react"

import { Pressable, View, StyleSheet, Text, Button, Image } from "react-native"
import { Camera } from "expo-camera"
import axios from "axios"
import { decode as atob, encode as btoa } from "base-64"

function TakePicture(props) {
  const participationId = 2
  const methodNum = 3
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [camera, setCamera] = useState(null)
  const [image, setImage] = useState(null)
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
    let data
    if (camera) {
      const options = { quality: 0.5, base64: true }
      let photo = await camera.takePictureAsync(options)
      setImage(photo.uri)
      // console.log(photo)
      data = photo.base64
      // console.log("hihi")
      // const file = dataURLtoFile("data:image/jpeg;base64," + imbase)
      // formData.set("file", file)
    }
    const dataForm = [
      { participation_id: String(participationId), std_img: data },
      { participation_id: String(participationId), feed_img: data, feed_content: "ohoh" },
      {
        participation_id: String(participationId),
        feed_img: data,
        feed_content: "ohoh",
        classification_keyword: "laptop",
      },
      { participation_id: String(participationId), feed_img: data, feed_content: "ohoh" },
      { participation_id: String(participationId), feed_img: data, feed_content: "ohoh" },
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
      })
      .catch((error) => {
        console.log(error.response.data.errcode)
      })
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera ref={(ref) => setCamera(ref)} style={styles.fixedRatio} type={type} ratio={"1:1"} />
      </View>

      <Button title="Take Picture" onPress={() => takePicture()} />
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
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
})
export default TakePicture
