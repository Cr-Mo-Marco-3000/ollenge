# Initiating Expo

> 기존에는 Expo CLI를 먼저 설치하는 것이 정석이었지만, 
> 
> 지금은 그럴 필요 없이 npx로  app을 create한 후 진행하면 된다.

## 1. Expo란?

- React Native는, 단순히 JS코드 부분을 의미하는 것이 아니라, 입력한 JS코드를 컴파일하는 부분, 이를 안드로이드, IOS등 운영체제와 데이터를 주고받는 부분 등을 포괄한다. 이런 부분들은 빌드하기 위해, JAVA, Android Studio(Android)나 Xcode(IOS)등이 필요하다.

- 이를 모두 설치하지 않고, JS부분만 간편하게 다루기 위해, 기본적인 부분들이 빌드된 상태인 Expo를 사용한다.

## 2. Init Expo

- `npx create-expo-app my-app`
  
  - 이후 y를 누르고 진행
  
  - cd my-app

- `npx expo login`
  
  - expo 아이디(이메일 주소)와 비밀번호로 로그인

- `npx expo start`
  
  - 서버 온
  - 이후 스마트폰 어플리케이션으로 접속

- `r`
  
  - 콘솔에서 누르면, 어플리케이션 전체가 리로드된다.

- `m`
  
  - m를 누르거나, 폰을 흔들면 도구가 뜬다.

### Snack

- snack.expo.dev

- 브라우저에서 React 어플리케이션을 만들 수 있게 해주는 온라인 코드 에디터

- QR코드를 찍어 스마트폰으로 앱을 확인하거나, 웹사이트 자체에서 확인 가능
