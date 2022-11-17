import React, { useEffect, useState } from "react"
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import ColorSet from "../../style/ColorSet"
import PageBase, { fontStyles } from "./PageBase"
import DeviceInfo from "../../style/DeviceInfo"

const iconLinks = ["../../assets/images/thumb-up.png", "../../assets/images/thumb-down.png"]
const { dw, dh } = DeviceInfo

const Modal = ({ title, value, valueHandler, setPick }) => {
  return (
    <View
      style={{
        width: dw,
        height: dh,
        backgroundColor: "rgba(0, 0, 0 ,0.6)",
        zIndex: 100,
        position: "absolute",
      }}
    >
      <KeyboardAvoidingView
        style={{ width: "100%", flex: 1, justifyContent: "center", alignItems: "center" }}
        behavior="padding"
      >
        <View
          style={{
            width: dw * 0.8,
            height: dw * 0.8,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 36,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...fontStyles.HyeminBold({ size: 8 }), marginBottom: 18 }}>{title}</Text>
          <TextInput
            multiline
            numberOfLines={6}
            maxLength={50}
            style={{
              ...fontStyles.HyeminBold({ size: 6, color: "black" }),
              width: "100%",
              flex: 1,
              padding: 24,
              borderWidth: 2,
              marginBottom: 18,
              borderRadius: 10,
              textAlign: "left",
            }}
            value={value}
            onChangeText={valueHandler}
          />
          <Pressable
            onPress={() => setPick(0)}
            style={{
              width: "100%",
              backgroundColor: `${ColorSet.navyColor(1)}`,
              borderRadius: 12,
              padding: 12,
            }}
          >
            <Text style={{ ...fontStyles.HyeminBold({ size: 4.5, color: "white" }) }}>
              입력 완료
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default function Page7({ info, setInfo, toNext, cancelAll }) {
  const [reward, setReward] = useState(info.rewardContent)
  const [penalty, setpenalty] = useState(info.penaltyContent)
  const [pick, setPick] = useState(0)

  useEffect(() => {
    setInfo((prev) => {
      return { ...prev, rewardContent: reward, penaltyContent: penalty }
    })
  }, [reward, setReward, penalty, setpenalty])
  return (
    <>
      <PageBase toNext={toNext} disabled={false} cancelAll={cancelAll}>
        <View flex={2} justifyContent="center">
          <Text style={{ ...fontStyles.HyeminBold({ size: 9 }), marginBottom: 16 }}>
            보상 / 벌칙 입력
          </Text>
          <Text style={fontStyles.Hyemin({ size: 5 })}>
            챌린지가 끝난 후 등수에 따른{"\n"}보상 혹은 벌칙이 있다면 입력해주세요{"\n"}(선택 사항)
          </Text>
        </View>
        <View style={{ flexDirection: "row", flex: 6 }}>
          <Pressable style={styles.iconFrame} onPress={() => setPick(1)}>
            <View style={styles.thumbIcon(reward)}>
              <Image source={require("../../assets/images/thumb-up.png")} />
            </View>
          </Pressable>

          <Pressable style={styles.iconFrame} onPress={() => setPick(2)}>
            <View style={styles.thumbIcon(penalty)}>
              <Image source={require("../../assets/images/thumb-down.png")} />
            </View>
          </Pressable>
        </View>
      </PageBase>

      {pick === 1 && (
        <Modal title={"보상 입력"} value={reward} valueHandler={setReward} setPick={setPick} />
      )}
      {pick === 2 && (
        <Modal title={"벌칙 입력"} value={penalty} valueHandler={setpenalty} setPick={setPick} />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  iconFrame: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  thumbIcon: (content) => {
    return {
      backgroundColor: "white",
      padding: 24,
      borderRadius: 12,
      elevation: 8,
    }
  },
})
