# 데이터베이스 프로그래밍 강의 저장소

## 학번 / 이름
**학번 :** 202207004  
**이름 :** 심동준

## 개요

이 프로젝트는 Node.js와 Express 기반의 웹 애플리케이션으로, Oracle DB를 사용하는 학사 관리 시스템의 기본 구조를 제공합니다.

주요 기능:
- 학생 관리 조회/등록/삭제
- 교수 관리 조회/등록/삭제
- 강좌 관리 페이지 기본 제공
- EJS 템플릿 기반 뷰 렌더링
- Oracle DB 연결 및 쿼리 처리

## 설치

1. `web` 폴더로 이동

```bash
cd c:\SDJ\web
```

2. 의존성 설치

```bash
npm install
```

## 실행

```bash
npm start
```

기본적으로 `http://localhost:3000`에서 애플리케이션이 실행됩니다.

## 프로젝트 구조

- `app.js` - Express 애플리케이션 설정 및 라우터 등록
- `bin/www` - 실행 가능한 HTTP 서버 진입점
- `connect.js` - Oracle DB 연결 함수
- `routes/` - 라우터 정의
  - `index.js` - 기본 홈 페이지
  - `users.js` - 사용자 관련 페이지
  - `haksa/` - 학사 관리 기능
    - `students.js` - 학생 조회/등록/삭제
    - `professors.js` - 교수 조회/등록/삭제
    - `courses.js` - 강좌 관리 페이지
- `views/` - EJS 템플릿
- `public/` - 정적 리소스

## 라우트 요약

- `/` - 홈 페이지
- `/users` - 사용자 기본 페이지
- `/users/login` - 로그인 페이지
- `/haksa/stu` - 학생 관리 페이지
  - `/haksa/stu/list.json` - 학생 목록 JSON
  - `/haksa/stu/insert` - 학생 등록 폼 및 등록 처리
  - `/haksa/stu/delete` - 학생 삭제 처리
- `/haksa/pro` - 교수 관리 페이지
  - `/haksa/pro/list.json` - 교수 목록 JSON
  - `/haksa/pro/insert` - 교수 등록 폼 및 등록 처리
  - `/haksa/pro/delete` - 교수 삭제 처리
- `/haksa/cou` - 강좌 관리 페이지

## 데이터베이스 설정

`connect.js`에서 Oracle DB 연결 정보를 설정합니다.

기본 설정 예시:

```js
oracledb.getConnection({
  user: 'webuser',
  password: 'pass',
  connectionString: '172.18.7.149:1521/xe'
});
```

DB 환경에 맞게 사용자, 비밀번호, 연결 문자열을 변경해야 합니다.

## 참고

- 뷰는 `views/index.ejs`를 통해 공통 레이아웃을 사용하며, `pageName`을 통해 각 페이지 콘텐츠를 포함합니다.
- Oracle DB 관련 쿼리는 `routes/haksa/` 하위 파일에서 관리됩니다.
- 프로젝트는 Express 4.x 및 EJS 템플릿을 사용합니다.

## 개선 제안

- DB 연결 정보를 환경 변수로 관리
- SQL 인젝션 방지를 위한 파라미터 바인딩 통일
- 강좌 관리 기능 추가 구현
- 예외 처리를 강화하여 에러 응답 일관성 확보
