![header](https://capsule-render.vercel.app/api?type=waving&height=200&section=header&text=TODO%20App%20Project%203조&color=gradient)
![](https://img.shields.io/badge/Last_Upadate-2023--07--21-blue)

# 3️⃣ TODO App project #3

> - TODO App 프로젝트 3조
> - 2023 코드스쿼드 마스터즈 Max에서 진행한 "TODO App"을 구현하는 그룹 프로젝트 
> - 미션 기간: 2023-07-10 (월) ~ 2023-07-21 (금)

- 프로젝트 Wiki → <a href="https://github.com/codesuqad-team3-to-do-list/todo-max/wiki"><img src="https://img.shields.io/badge/Kiosk_Home-black?logo=Wikipedia"></a>

<br/>

## 👨‍👩‍👧‍👦 멤버 소개

| 프론트엔드 | 프론트엔드 | 백엔드 | 백엔드 | 백엔드 | 벡엔드 |
| :---: | :---: | :---: | :---: | :---: | :---: |
| <img src="https://avatars.githubusercontent.com/u/57666791?v=4" width="120"/>| <img src="https://avatars.githubusercontent.com/u/101464713?v=4" width="120"/> | <img src="https://avatars.githubusercontent.com/u/57752068?v=4" width="120"/> | <img src="https://avatars.githubusercontent.com/u/108214590?v=4" width="120"/> | <img src="https://avatars.githubusercontent.com/u/121915790?v=4" width="120"/> | <img src="https://avatars.githubusercontent.com/u/86359180?v=4" width="120"/> |
| **[Khundi](https://github.com/jsh3418)** | **[TOKO](https://github.com/aaaz425)** | **[Bean](https://github.com/tjdqls1200)** | **[Jinny](https://github.com/jinny-l)** | **[Joy](https://github.com/he2joojo)** | **[Ape](https://github.com/crtEvent)** |

<br/>

## 🖥️ 동작 화면

### 로그인
![로그인](https://github.com/codesuqad-team3-to-do-list/todo-max/assets/86359180/938318f9-4001-4039-be6b-b09dd970873b)

### 메인 페이지
![메인 페이지](https://github.com/codesuqad-team3-to-do-list/todo-max/assets/86359180/f3a73a60-476b-4da6-9c66-2c3502fa6173)

### 카드 생성
![카드 생성](https://github.com/codesuqad-team3-to-do-list/todo-max/assets/86359180/65683bae-17c7-4540-9da3-835a4007fe93)

### 카드 삭제
![카드 삭제](https://github.com/codesuqad-team3-to-do-list/todo-max/assets/86359180/854cced5-6486-44aa-b1e3-2525b6373971)

### 카드 수정
![카드 수정](https://github.com/codesuqad-team3-to-do-list/todo-max/assets/86359180/10591ade-237f-4016-be28-46035f2c3d8c)

### 활동 기록
![사용자활동기록](https://github.com/codesuqad-team3-to-do-list/todo-max/assets/108214590/05f23f93-cf55-491f-ab93-8c3df534cf79)

<br/>

## 🔧️ 개발 환경

### Front-End
![](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=flat)
![](https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white&style=flat)
![](https://camo.githubusercontent.com/a91f29fbfde227665b0cd5a447c0b035180e8a285bfef1ec8d91c8ba80fcaa20/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547970657363726970742d3331373843363f7374796c653d666c6174266c6f676f3d54797065536372697074266c6f676f436f6c6f723d7768697465)
![](https://camo.githubusercontent.com/e3883202fdd9cb44fd6a62f35730342d5cd477c3d76a2140aa38aa87eac6b224/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d56697375616c25323053747564696f253230436f64652d3030374143433f7374796c653d666c6174266c6f676f3d56697375616c25323053747564696f253230436f6465266c6f676f436f6c6f723d7768697465)
![](https://img.shields.io/badge/styled%20components-DB7093?style=flat-square&logo=styled-components&logoColor=white&style=flat)

### Back-End
![](https://img.shields.io/badge/Java-007396?style=flat&logo=Java&logoColor=white)
![](https://img.shields.io/badge/SpringBoot-6DB33F?style=flat&logo=SpringBoot&logoColor=white)
![](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white)
![](https://img.shields.io/badge/AWS%20EC2-FA7343?style=flat&logo=amazonec2&logoColor=white)
![](https://img.shields.io/badge/AWS_RDS-527FFF?style=flat&logo=amazonrds&logoColor=white)
![](https://img.shields.io/badge/-AWS_S3-569A31?style=flat&amp;logo=Amazon-S3&amp;logoColor=white)

- Java: `JDK 11`
- SpringBoot: `ver. 2.7.13`
- MySQL: `ver. 8.0.33`

<br/>

## ⚙️ 인프라 구조
![kiosk-infra-2 drawio (1)](https://github.com/codesuqad-team3-to-do-list/todo-max/assets/86359180/38d5af24-d95a-4326-810e-f67834117785)

<br/>

## 💾 ERD
![ERD v0 5 2023-07-18](https://github.com/codesuqad-team3-to-do-list/todo-max/assets/86359180/7ae6fc04-d079-4495-80b2-9f4b6b6086fa)

<br/>

## 🌎 API 명세서

### 로그인
| 기능       | HTTP Method | URL                            |
|:---------|:------------|:-------------------------------|
| 로그인                | `POST`   | `/api/login`                         |
| Access Token 재발급   | `POST`   | `/api/auth/reissue-access-token`     |
| 회원 가입             | `POST`   | `/api/signup`                        |

### 카드
| 기능       | HTTP Method | URL                            |
|:---------|:------------|:-------------------------------|
| 컬럼/카드 목록 조회 | `GET`  | `/api/columns`                      |
| 카드 등록             | `POST`  | `/api/columns/{columnId}/cards`     |
| 카드 제목/내용 수정    | `PATCH`  | `/api/cards/{cardId}`               |
| 카드 위치 변경        | `PATCH`  | `/api/columns/{columnId}/cards/{cardId}` |
| 카드 삭제             | `DELETE`  | `/api/columns/{columnId}/cards/{cardId}` |

### 히스토리
| 기능       | HTTP Method | URL                            |
|:---------|:------------|:-------------------------------|
| 활동 로그 목록 조회    | `GET`   | `/api/histories?historyId={historyId}&count={count}` |
| 활동 로그 전체 삭제    | `DELETE`| `/api/histories`                     |
