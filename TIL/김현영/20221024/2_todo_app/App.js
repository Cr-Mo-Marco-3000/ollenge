import { StatusBar } from "expo-status-bar"

// localStorage와 같은 역할을 함
import AsyncStorage from "@react-native-async-storage/async-storage"

import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native"

import { useState, useEffect } from "react"

// 누르는 Event를 Listen할 준비가 된 View
// 누른 요소를 약간 투명하게 만듦 => 옵션으로 조절 가능
// pressable로 대체되어 사라질 것
import { TouchableOpacity } from "react-native"

// 누르면 background 색을 바꾸어 주는 등, 웹에서와 비슷한 효과를 줌
import { TouchableHighlight } from "react-native"

// 어플리케이션에 변화를 일으키지 않고 이벤트를 인식
// 버튼과의 차이 => 버튼은 self closing tag & title(내부 텍스트) 지정 필수
import { TouchableWithoutFeedback } from "react-native"

// 좀 더 다양한 설정을 가진 touchable => TouchableOpacity와는 달리 hitSlop도 설정 가능
// hitSlop란, 요소 바깥 부분 어디까지 입력을 감지할 지 정하는 프롭이다.
import { pressable } from "react-native"

// color 모듈화
import theme from "./colors"

export default function App() {
  const [working, setWorking] = useState(true)
  const [text, setText] = useState("")
  const [alertText, setAlertText] = useState("")

  const [toDos, setToDos] = useState({})

  const work = () => setWorking(true)
  const travel = () => setWorking(false)
  const onChangeText = (payload) => {
    setText(payload)
  }

  const TODOS_KEY = "@toDos"

  const saveToDo = async (toSave) => {
    try {
      // async Storage에 저장 전, 로컬 스토리지에 저장하는 것 처럼 Stringfy해야 한다.
      const stringfiedToDo = JSON.stringify(toSave)
      await AsyncStorage.setItem(TODOS_KEY, stringfiedToDo)
    } catch (error) {
      console.log("에러발생!")
    }
  }

  const loadToDo = async () => {
    try {
      const value = await AsyncStorage.getItem(TODOS_KEY)
    } catch (error) {}
  }

  const addTodo = (payload) => {
    if (!text) {
      setAlertText("입력해주세요!")
      setTimeout(() => {
        setAlertText("")
      }, 2000)
    } else {
      // 객체를 만들 때, key가 대괄호로 둘러쌓인 경우, 이를 계산된 프로퍼티라 일컫는다.
      // 단순 변수가 올 수도 있고, 복잡한 표현식이 올 수도 있다.

      // Date.now()를 키로 사용한 todo 객체를 만든다.
      // 두 가지 방법

      // 1. Object.assign(target, ...sources)
      // => object를 합친다. 첫 번째 요소는 출처 객체의 속성을 복사해 반영한 후 반환할 객체,
      //두 번째 객체부터는 반영하고자 하는 속성값을 가진 객체들이다.
      // const newToDos = Object.assign({}, toDos, {
      //   // 단축 프로퍼티:text:text이므로, key는 스트링, value는 변수에 할당된 걸로 들어간다.
      //   [Date.now()]: { text, work: working },
      // })

      // 2. ...이용하기
      const newToDos = { ...toDos, [Date.now()]: { text, working } }
      setToDos(newToDos)
      saveToDo(newToDos)
      setText("")
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            // style prop의 value 내부에 객체가 들어감으로 double bracket으로 해 주어야 한다.
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{ ...styles.btnText, color: working ? theme.grey : "white" }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.alertMessage}>{alertText}</Text>
        <TextInput
          placeholder={
            working ? "무슨 일을 하실건가요?" : "어디로 떠나실건가요?"
          }
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          // submit 됐을 때 실행되는 함수
          onSubmitEditing={addTodo}
          // placeholderTextColor={theme.grey}
          // 포커스 됐을 때, 자동으로 모든 텍스트 블록설정
          // selectTextOnFocus
          // keyboardType="number-pad"
          returnKeyType="done"
          // returnKeyLabel="Add"
          // secureTextEntry
          // multiline
        ></TextInput>
        <ScrollView>
          {Object.keys(toDos).map((key, idx) =>
            // 아래 부분이 통째로 return 된다고 생각하면 된다.
            // 화살표 함수에서, => 뒤 부분이 통째로 리턴되는 경우는, 한 줄이 아니라, 하나의 자료형 => ()로 묶인 부분이다!
            toDos[key]["working"] === working ? (
              <View
                style={styles.toDo}
                key={key}
              >
                {/* 렌더링되는 react Child은 스트링이어야 한다. */}
                <Text style={styles.toDoText}>{toDos[key]["text"]}</Text>
              </View>
            ) : null
          )}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  btnText: {
    // color: theme.grey,
    color: "white",
    fontSize: 40,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "white",
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 18,
    marginBottom: 20,
  },
  alertMessage: {
    color: "red",
    textAlign: "center",
    marginVertical: 2,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    color: "red",
  },
  toDoText: {
    color: "white",
    fontSize: 25,
    fontWeight: "500",
  },
})
