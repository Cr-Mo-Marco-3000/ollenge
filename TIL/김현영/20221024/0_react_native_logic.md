# React Native의 동작원리

![GFG.png](0_react_native_logic.assets/f6ab99807b5be968df007b9a6c743608113d96bf.png)

## 1. Event

- Android, IOS에서 Event(사용자의 조작 등)을 감지

## 2. Collect data and notify

- Event에 관련된 정보들을 수집

## 3. Serialized payload

- React Native에서 수집한 정보를 JSON 포맷으로 변형

## 4. Process event

- 이벤트를 개발자가 작성한 코드를 바탕으로 처리

## 5. Call native methods or update UI

- 처리한 결과에 따라 메서드를 부르거나 UI를 변경하라는 명령 생성

## 6. Serialized batched response

- JSON 포맷으로 명령을 변형시킴

## 7. Process commands

- 명령을 처리

## 8. Update UI

- 처리된 명령의 결과에 따라 UI를 변경
