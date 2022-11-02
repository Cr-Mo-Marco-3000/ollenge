# Flexbox in React Native

- View 컨테이너는 기본적으로 Flex Container 
  
  - display flex를 할 필요가 없다.
  
  - React Native에서의 Flex Direction은 기본적으로 Column이다.

- 모바일 앱에서는 레이아웃을 짤 때, width나 height는 아이콘, 아바타를 제외하고 잘 쓰지 않을 것이다.

- 주로 상대적 비율을 조절하는 flex를 사용한다.

- flex 사용법은 css에서의 flex 사용법과 같다.
  
  - 비율 = 개별 요소의 flex / 형제 요소의 flex의 합

- 부모에 flex를 먹이는 등 높이를 지정해 주는 걸 잊지 말자.



```js
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"

export default function App() {
  return (
    // View 컨테이너는 기본적으로 Flex Container => display flex를 할 필요가 없다.
    // React Native에서의 Flex direction은 기본적으로 column
    // width와 height는 아이콘이나 아바타를 제외하고는 많이 사용하지 않을 것이다 => 여러 기기에 호환되지 않기 때문
    // 레이아웃을 짤 때는, 주로 상대적 비율을 조절하는 flex를 사용한다 => CSS에서와 비슷
    // 알다시피, flex는 차지하는 flex /전체 flex로 계산한다.
    // 부모에 flex를 먹여서(혹은 다른 방법으로라도) 높이를 지정해 주는 걸 잊지 말것!
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "tomato" }}></View>
      <View style={{ flex: 1, backgroundColor: "teal" }}></View>
      <View style={{ flex: 1, backgroundColor: "orange" }}></View>
    </View>
  )
}

```
