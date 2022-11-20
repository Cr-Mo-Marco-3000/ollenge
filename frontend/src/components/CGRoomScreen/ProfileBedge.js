import React, { useContext, useState, useRef } from "react"

import { View, Image, StyleSheet, Pressable, TextInput } from "react-native"
import { Portal, Modal, Button } from "react-native-paper"
import { RFPercentage } from "react-native-responsive-fontsize"
import LottieView from "lottie-react-native"

import defaultImage from "../../assets/images/default-image.png"
import ColorSet from "../../style/ColorSet"
import AppBoldText from "../common/AppBoldText"
import { MailIcon } from "../../assets/images/index"
import { AuthContext } from "../../../store/auth-context"

function ProfileBedge({ user, isActive, pushtoken, isStarted, isTime }) {
  const animation = useRef(null)
  const [visible, setVisible] = useState(false)
  const [send, setSend] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const authCtx = useContext(AuthContext)
  const defaultImageUri = Image.resolveAssetSource(defaultImage).uri

  const sendHandler = function () {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: `${pushtoken}`,
        title: "오늘 인증을 완료하세요!",
        body: `${authCtx.userInfo.nickname}: ${inputValue}`,
      }),
    })
      .then((res) => {
        setSend(true)
        setInputValue("")
      })
      .catch((err) => console.log(err))
  }

  function showModal() {
    if (!isActive && isStarted == "playing" && isTime == "playing" && pushtoken) {
      setVisible(true)
    }
  }

  function hideModal() {
    setVisible(false)
    setSend(false)
    setInputValue("")
  }

  function confirmHandler() {
    setVisible(false)
    setSend(false)
  }

  const containerStyle = {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: "5%",
    paddingVertical: "3%",
  }

  return (
    <>
      <Portal>
        {send && (
          <LottieView
            autoPlay
            loop={false}
            ref={animation}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
            }}
            source={require("../../assets/Lottie/smallConfeti.json")}
          />
        )}
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: "10%",
          }}
        >
          {send ? (
            <View style={{ alignItems: "center" }}>
              <AppBoldText size={2.8}>전송을 완료했습니다!</AppBoldText>
              <Pressable style={styles.btnBox} onPress={confirmHandler}>
                <AppBoldText size={2.2}>확인</AppBoldText>
              </Pressable>
            </View>
          ) : (
            <View style={{ width: "100%", alignItems: "center" }}>
              <View style={{ width: RFPercentage(8), height: RFPercentage(8) }}>
                <MailIcon />
              </View>
              <AppBoldText size={2.8}>
                {user.nickname}님께{"\n"}메세지를 전송하시겠어요?
              </AppBoldText>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  marginTop: "5%",
                }}
              >
                <TextInput style={styles.inputBox} onChangeText={(text) => setInputValue(text)} />
                <Button
                  mode="contained"
                  onPress={sendHandler}
                  buttonColor={`${ColorSet.yellowColor(0.7)}`}
                  textColor={`${ColorSet.navyColor(1)}`}
                  theme={{
                    fonts: {
                      labelLarge: {
                        fontFamily: "HyeminBold",
                      },
                    },
                  }}
                >
                  전송
                </Button>
              </View>
            </View>
          )}
        </Modal>
      </Portal>
      <Pressable
        style={isActive ? [styles.imgBox, styles.activeBorder] : [styles.imgBox, styles.border]}
        onPress={showModal}
      >
        <Image
          source={user.profileImg ? { uri: user.profileImg } : { uri: defaultImageUri }}
          style={{ width: "100%", height: "100%", borderRadius: 100 }}
          resizeMode="cover"
        />
      </Pressable>
    </>
  )
}
export default ProfileBedge

const styles = StyleSheet.create({
  imgBox: {
    width: RFPercentage(7),
    height: RFPercentage(7),
    borderRadius: 100,
    marginRight: RFPercentage(1),
  },
  activeBorder: {
    borderColor: "#1fd184",
    borderWidth: 3,
    shadowColor: `${ColorSet.yellowColor(1)}`,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5.65,

    elevation: 5,
  },
  border: {
    borderColor: `${ColorSet.grayColor(1)}`,
    borderWidth: 3,
  },
  inputBox: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: `${ColorSet.navyColor(1)}`,
    fontFamily: "HyeminBold",
  },
  btnBox: {
    backgroundColor: `${ColorSet.yellowColor(0.7)}`,
    borderRadius: 20,
    width: RFPercentage(8),
    justifyContent: "center",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    marginTop: "5%",
  },
})
