# 오랭지

## 서비스 소개

### 기술 스택

- Front-end : Nginx, React Native, Material UI
- Back-end : Spring Boot, JPA, QueryDSL
- Infra, etc : Docker, Jenkins

## 팀 소개

### 팀 명

- 밍기뉴

### 팀원 소개

- **원찬호** : 팀장, Front-end
- **김현영** : Front-end
- **우시은** : Back-end, Infra
- **이도경** : Back-end
- **조혜림** : Front-end, UX/UI
- **홍제민** : Front-end

# Git과 Jira 사용 규칙

## Jira

### Issue 네이밍 규칙

```bash
[분류] 이슈 이름
```

- 분류 : FE, BE, INFRA, 설계, 기획, 발표, ETC

### Sprint

- 1주 단위로 반복

### Issue의 종류

- Epic
    - 최상위 수준의 기능, 작업의 단위
    - 여러 Sprint에 걸쳐서 진행되는 정도의 범위
    - ex) 회원 관리, 로그인 관리
- Story
    - Epic의 하위 단계 기능, 작업의 단위
    - ex) 회원가입, 회원 정보 수정, 회원 탈퇴, 로그인, 비밀번호 찾기
- Subtask
    - 위 issue의 종류에서 세부 단위 작업이 필요할 때 등록함
    - ex) OPEN API를 호출하여 최근 글을 JSON으로 받아 출력한다.

### Issue Cycle

1. 스프린트 생성, 활성화
2. 백로그에 issue 추가
3. 적절한 단위의 Epic 등록
4. 조금 더 작은 단위의 Story를 등록하고 Epic에 포함 시키기
    1. 타입 지정
    2. 제목 지정 (ex. [FE] 로그인 페이지 구현)
    3. Assignee 지정
    4. Story Point 지정
        1. 4점 이하로 지정하는 것을 권장
        2. 인당 1주에 40점 이상을 진행하는 것을 권장함
5. Story를 조금 더 작은 단위로 분리하기 위해서는 **Subtask 활용**하여 등록
6. 추가된 issue를 백로그에서 꺼내어 Sprint에 등록
7. 진행 과정에 맞추어 issue의 상태를 변경

## Git Branch 전략

### 브랜치 소개
- **master 브랜치**
    - **제품으로 출시될 수 있는 브랜치**
        - 배포 이력을 관리하기 위해 사용함
        - 배포가능한 상태만을 관리
    - master 브랜치는 소프트웨어를 언제든지 실행할 수 있는 상태여야 함
    - 개발자가 직접 master 브랜치의 코드를 변경하거나 commit 해서는 안 됨
    - master 브랜치는 배포 가능한 상태까지 개발된 코드가 merge 되는 곳
        - 일반적으로 merge는 배포 바로 직전에만 이루어짐
        - merge 될 때 버전 태그 정보를 추가
- **develop 브랜치**
    - **다음 출시 버전을 개발하는 브랜치**
        - 기능 개발을 위한 브랜치들을 병합하기 위해 사용
    - develop 브랜치는 개발 중인 코드의 중심이 되는 브랜치
        - 개발자가 직접 develop 브랜치의 코드를 변경하거나 commit 해서는 안 됨
    - 코드를 수정하고 싶을 때는 develop 브랜치를 중심으로 새로운 feature 브랜치를 생성
        - 만들어진 feature 브랜치를 기반으로 기능 추가와 코드 수정
- **feature 브랜치**
    - **기능을 개발하는 브랜치**
        - 새로운 기능 개발 또는 버그 수정이 필요할 때마다 develop 브랜치로부터 분기
    - feature 브랜치는 develop 브랜치에서 파생된 브랜치
        - 개발자는 이 브랜치에서 코드를 직접 수정
    - feature 브랜치 이름은 `issue-number/issue-name` 으로 작성
    - feature 브랜치에서 개발이 끝나면 develop 브랜치에 merge를 수행
- **hotfix 브랜치**
    - **출시 버전에서 발생한 버그를 수정하는 브랜치**
    - hotfix 브랜치는 릴리즈된 프로그램에서 발생한 버그들을 수정하기 위한 브랜치
        - hotfix 브랜치는 master 브랜치로부터 파생
        - 수정한 버그들을 적용하기 위해 master와 develop 브랜치 모두에 병합
    - hotfix 브랜치는 취약점이 있는 버그가 발견되어 빠른 대응이 필요한 경우, 차기 버전까지 기다릴 수 없는 경우 사용
    - hotfix 브랜치의 이름 역시 hotfix-*, hotfix/* 과 같이 지정한다.
        - ex) hotfix-1.2.1

### feature branch 네이밍 규칙

```bash
S07P12A302-1/login-user
```

### 사용

- master, develop, feature, hotfix 브랜치 사용

### Pull Request 보내기

- feature branch를 develop에 merge하고자 할 경우 PR을 보내고, 코드 리뷰 또는 의견 공유 진행
- 진행 상황을 확인하는 것에도 도움이 되므로 PR 생기면 꼭 확인하기

## Git Commit Message

### Commit message 구조

```bash
[#issueNumber] type: Subject

body

footer
```

- 제목과 본문, 본문과 푸터 사이에는 반드시 한 줄 띄우기

### Commit Type

```bash
- feat 		 : 새로운 기능 추가
- fix 	   : 버그 수정
- design   : CSS등의 사용자 UI 변경
- docs  	 : 문서 수정
- style  	 : 코드 formatting, 세미콜론(;) 누락, 코드 변경이 없는 경우
- refactor : 코드 리팩토링
- comment  : 주석 추가 및 변경
- test 		 : 테스트 코드, 리팩토링 테스트 코드 추가 (프로덕션 코드 변경 X)
- chore 	 : 빌드 업무 수정, 패키지 매니저 수정 (프로덕션 코드 변경 X)
- rename   : 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
- remove   : 파일을 삭제하는 작업만 수행한 경우
```

### 제목

- 제목은 제목만 보고도 변경 사항이 무엇인지 알 수 있도록 작성
- 50자를 넘지 않으며, 마침표를 붙이지 않음
    - 셀 필요는 없지만, 너무 길지 않도록 주의
- 커밋 종류(type)와 이슈 번호를 반드시 붙여야 함
- 영어로 작성시
    - 과거시제 사용하지 않으며 명령조로 작성하기
    - 첫 글자는 반드시 대문자로

### 본문

- 본문 내용은 선택사항
- 한 줄에 72자를 넘지 않도록 작성
    - 셀 필요는 없으나, 너무 길지 않도록 작성
- 어떻게(How)보다 무엇을, 왜(What, Why)에 맞춰 작성
- 설명뿐만 아니라, 커밋의 이유를 작성할 때에도 사용

### 꼬릿말

- 마찬가지로 선택사항
- Issue Tracker ID를 작성할 때 사용

```bash
Resolved: #123
See also: #456, #789
```