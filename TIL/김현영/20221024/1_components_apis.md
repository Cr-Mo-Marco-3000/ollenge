# Components and APIs

> React Native의 컴포넌트에 대해서 서술한다.
> 
> 모든 부분을 서술하는 건 불가능하지만, 나중에 Recap 하기 쉽게 기본적인 부분을 서술한다.

## 1. Components

- 화면에 렌더링되는 요소

- 단, StatusBar(Third Party)같이 일부 컴포넌트는 앱 화면에 렌더링되지 않는다.

### 1. View

- div 대신 사용하는 컴포넌트이다

### 2. Text

- React Native에서, 모든 텍스트 요소는 이 컴포넌트 안에 들어가야 한다.

---

## 2. APIs

- JS 코드

- 운영 체제와 소통하는 코드이다.

- Vibrate같이 운영체제를 건드리거나, 렌더링되는 부분이 아닌 특수한 기능을 담당한다.

### 1. StyleSheet

- 컴포넌트에 스타일을 먹일 때 사용한다.

- 일반적인 객체를 사용해도 되지만, 본 API를 사용하는 이유는, 자동완성 기능 때문이다.

- border같이, 일반적인 CSS에서는 사용 가능하지만 React Native에서는 사용 불가능한 property등이 있다.

```js
import {StyleSheet} from "react-native"

export default function App() {
  return (
    // 아래와 같이 {}에 담아 사용한다.
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.text}>We need to go early tomorrow!</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
    color: "red",
  },
})


// JSX 안의 style={{property:value}}로 작성하거나
// 아래와 같이 단순 객체로 작성해도 무방하나, 자동 완성 기능이 제공되지 않는다.
/*
const styles = {
container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    border: "1px green dashed",
  },
}
*/
```



### 2. Vibrate
