# Touchable

> 터치 가능한 영역을 지정하는 컴포넌트를 Touchalbe이라고 한다.
> 
> 여러 가지 종류가 있다.



- Event Listening Prop으로 다음과 같은 것들을 가진다.
  
  - onPress
  
  - onPressIn
  
  - onPressOut
  
  - onLongPress



- 터치 범위 설정 Prop
  
  - hitSlop



- Pressable같이, 더 세밀한 설정을 통해 Event를 감지할 수 있는 컴포넌트들도 있다.



## 0. Button

- Touchable에 속하지 않지만, 비슷한 기능을 한다.

- html에서의 Button과는 다르게, Self Closing Tag이다.

- `title` 프롭으로 text를 지정할 수 있으며, 본 프롭은 필수이다.

- 기본적으로, 입력시 아무런 효과를 주지 않는다.



## 1. TouchableOpacity

- 클릭한 요소를 약간 투명하게 만드는 컴포넌트이다.

- 간편하게 사용할 수 있지만, 다양한 프롭등을 지원하지 않기 때문에 장기적으로 Pressable로 대체될 가능성이 있다.



## 2. TouchableHighlight

- 클릭했을 때, 영역의 배경색을 바꾸어 주는 등의 효과를 준다.

- Props
  
  - underlayColor
  
  - activeOpacity



## 3. TouchablewithoutFeedback

- 터치했을 때, 기본적으로 아무런 효과도 발생시키지 않는다.



## 4. Pressable

- Touchable의 미래?

- 기본적으로 TouchablewithoutFeedback와 비슷하지만, 더 다양한 옵션들을 가지고 있다는 것이 다르다.



```js
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, Button, Pressable } from "react-native"

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
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <Pressable
          hitSlop={10}
          onPress={() => {
            console.log("앙냥냥")
          }}
        >
          {/* <TouchableHighlight
          onPress={() => {
            alert("앙냥냥")
          }}
          underlayColor="red"
          activeOpacity={0.5}
          // onPressIn
          // onPressOut
          // onLongPress
        > */}
          <Text style={styles.btnText}>Travel</Text>
          {/* </TouchableHighlight> */}
        </Pressable>
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
})

```






