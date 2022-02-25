# 기술 과제

## 배포

[배포 주소](https://vibrant-turing-05fbb3.netlify.app/)

## 빌드 & 실행

```
$ yarn 
& 
$ yarn install
```

```
$ yarn start
```

## 추가한 스택

- React Query
- react-router-dom
- 파일 사이즈나 날짜 관련 로직들은 템플릿에 내장되어있던 `filesize`, `date-fns`를 사용

## 이슈들

### CORS 

cors 이슈 때문에 proxy설정
```
"proxy": "https://storage-fe.fastraffic.io/homeworks"
```

### 이미지 403

과제로 주어진 주어진 API의 thumnailUrl로 접근시 403이 떠서 error시에 기본 이미지가 출력되도록 설정 

<img width="400" src="https://user-images.githubusercontent.com/45571631/155767157-42c2df20-3399-4a88-92ae-dbeea6168cb0.png" alt="이미지1">

### 유효기간

현재(2022-02-26)시각을 기준으로 제공된 API의 파일들은  모두 유효기간이 만료되어 제대로된 뷰를 보여줄 수가 없었음

따라서 `master`브랜치에선 날짜를 2022년 1월 24일 월요일 오전 10:08:55로 고정

`feature/currentDate` 브랜치에서는 현재 시각을 기준으로 돌아감 

