# React Native

+ 따르는 강의: 노마드 코더의 React-Native 101
+ ![image-20221019230917500](C:\Users\SSAFY\Desktop\자율PJT\S07P31A501\TIL\원찬호\ReactNative.assets\image-20221019230917500.png)

+ 원래는 휴대폰의 운영체제 (apk, ios)와 소통하기 위해 Java 와 Xcode를 사용해야 한다
  + 그러나 이 강의에서는 expo & watchman 이라는 프로그램을 사용해 Java와 Xcode의 컴파일링 역할을 대체한다
  + 그리고 우리가 작성하는 코드는 위의 이미지에 있는 Javascript 와 Markup/Styling 블록 뿐이다.

+ Watchman 설치 오류 해결

  1. 링크: https://bogyum-uncle.tistory.com/153

  2. 이 `choco install watchman` 커맨드를 shell에 입력한다.
  3. `watchman -v` 커맨드를 입력해 버전 출력이 제대로 되는지 확인한다.

---

+ React Native는 브라우저가 아닌 Interpreter이다.
+ 우리와 운영체제 사이에서 각 운영체제에 맞게 코드를 바꿔주는 것이다.

​	![image-20221019233124060](C:\Users\SSAFY\Desktop\자율PJT\S07P31A501\TIL\원찬호\ReactNative.assets\image-20221019233124060.png)

+ event가 발생하면 운영체제에서 해당 데이터를 수집하고 이것을 JS코드에 도착한다

+ 그리고 해당 명령문을 native method에 맞게 바꾸고 명령을 보낸다

---

+ npm start 를 하면 로컬에서 빌드/확인이 가능하다. => 오류 발생
  + 해당오류를 해결하기 위해서 `npm start --tunnel` 를 통해 해결할 수 있다.
  + 또한, 동일한 Wi-fi에 접속하고 있어야만 가능하다!

---

[React Native UI Framework](https://ccusean.tistory.com/entry/React-Native-UI-Components-Library-Top-3)

1. React Native Elements
+ 쉬운 커스터마이징과 약 3년간 부동의 1위 자리를 지키고 있는 라이브러리이다.

2. React Native Paper
+ 꾸준히 잘 성장하고 있는 컴포넌트 라이브러리이다.
+ 구글 Material Design 가이드라인을 준수하고 잘 반영되어 있다.

3. Native Base
+ 호환성의 문제로 점유율이 하락하였으나,과거에는 1위를 자리하던 UI 컴포넌트 라이브러리이다.

`expo init TravelHard --npm`
+ 발생한 오류: expo-cli is not supported...

원인으로는 node 버전이 최신화가 되지 않아 그럴 수 있다고 한다. => 
그 후, `npm install --global expo-cli` 를 실행했다.

그러자 발생한 'file already exists'
.