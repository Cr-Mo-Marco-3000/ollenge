# ESLint

[react-native eslint 설정](https://thrillfighter.tistory.com/737)

### ESlint란?

- **lint**란 소스코드의 문법오류나 버그 등을 찾아주는 도구이다.
- Javascript에서 사용하는 linter는 ESlint이다.

### 환경설정

```jsx
/** eslint 다운로드 */
npm install -D eslint

/** 다운로드 */
npm install -D @eslint/create-config

/** 
	eslint 다운로드 
	선택 절차는 블로그 글 참고해서 하기!
*/
npx eslint --init 
```

- 여기까지 하면 root 폴더에 .eslintrc.js 파일이 생성됨

```jsx
/** .eslintrc.js */
export default {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    indent: ['error', 2], /** 최초에는 4로 되어있는데, 2로 수정한다*/
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
};
```

- 그 외 속성들에 대한 설명은 [링크에](https://thrillfighter.tistory.com/737) 있음,

------

# Prettier [링크](https://dev-yakuza.posstree.com/ko/react-native/eslint-prettier-husky-lint-staged/#prettier)

- Prettier란 Code Formatter로써, 정해진 규칙에 따라 코드 스타일을 통일 시켜준다

```bash
npm install --save-dev prettier eslint-plugin-prettier
```

- root 폴더에 .prettierrc.js가 없다면 파일을 생성하고 다음 코드를 작성한다.

```bash
export default {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  semi: false,
}
```

## ESLint에 Prettier 설정하기

```jsx
module.exports = {
  ...
	/** Typescript를 사용하지 않는다면 typescript는 안 써도 됨.*/
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],

  rules: {
    ...
    'prettier/prettier': 'error',
  },
  ...
};
```

## VSCode에서 Prettier 사용하기

- VSCode에서 Prettier를 설치하고 `Open Settings(JSON)` 파일을 연다

  <aside> 💡 Open Settings (JSON) 여는 법

  1. Prettier extension의 설정 화면에 들어간다
  2. 우측 상단에 문서를 뒤집는 모양의 아이콘을 누른다. </aside>

- 문서에 `"editor.formatOnSave": true,` 를 추가한다.

  - 그러면 저장할 때마다 틀린 부분을 자동으로 수정해준다.

------

# 이슈

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/378898be-e3ad-46a9-8b17-8d84e9c679f0/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/099821b2-c4ee-4003-bdce-2e6768f71829/Untitled.png)

- 위와 같은 에러가 뜨는데, 해결 방법은 뭘까

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/207e9a0d-c72a-4035-a9d8-62cdd3fa754a/Untitled.png)

- module exports 를 export default로 바꾸니까 해결

  - module exports 는 CommonJS 즉, require(””)로 import 해올 때 쓰던 것이다.
  - ES6에서는 import / export로 쓰기 때문에 부적절 했던 것