# FAFA

자녀와 부모를 위한 AI 스피커 기반 LBS(Location-Based Service)

NUGU play kit : ver 2.0

Python 3.6

Django 2.1.1

DRF 3.11.0

SQlite 3.21.0

AWS EB

NUGU play kit + DRF + SQlite + ReactNative + AWS + randomForest

python 3.6


## 요약

---

FAFA는 아이와 부모의 양방향 소통을 위한 인공지능 스피커 기반의 서비스이다. 초등학교 고학년 이상의 휴대폰 보급율은 점점 증가하지만, 점차 줄어드는 가정 유선 보급률과 저학년 이하의 낮은 휴대폰 보급율은 미취학 아동의 통신 수단 고립을 초래한다. 이를 해결하고자 휴대폰이 아닌 인공지능 스피커를 활용해 부모와 아이의 양방향 소통을 제공한다. 아이는 NUGU(SKT의 인공지능 스피커)를 통해, 부모는 모바일 어플리케이션을 통해 서로와 소통할 것이다.

## 소개

---

### 1. 동기

2018년 기준 초등학교 고학년의 휴대폰 보급율은 90% 이상이지만, 저학년의 보급율은 58.8%이고 유치원생까지 포함한다면 그 격차는 더 클 것으로 예상한다. 또한 유선 전화 보급율도 매년 줄어들어 2019년에는 최저치인 51.9%를 기록했다.이를 통해 휴대폰 없이 집에 혼자 남은 아이가 부모에게 연락할 수단이 없는 상황이 증가하는 추세임을 파악했다.

### 2. 문제 분석

자녀의 휴대폰을 개통하면 해결할 수 있는 문제이지만, 부모들은 휴대폰 구매 및 통신 비용에 대한 부담과 어린 자녀의 게임 중독 우려로 이를 망설이고 있다. 또한 부모를 위해 자녀의 위치를 확인하는 LBS 서비스는 시중에 많지만, 그 반대로 집에 혼자 남은 아이가 부모의 현재 정보를 파악하는 수단은 없다.

### 3. 해결 방안

SKT의 인공지능 스피커 NUGU를 활용하여 휴대폰이 없는 자녀를 위한 부모와의 연결 서비스를 제공한다.  집에 혼자 남은 아이는 부모가 어디에 있는지 알 수 있고, 부모는 아이가 집에 잘 도착했는지, 자신을 찾는지 알 수 있기에 부모와 아이의 양방향 소통이 가능해질 것이다.

자녀의 휴대폰 개통에 대한 부담없이 NUGU 스피커를 활용하면 되기에 부모 입장에서는 아이의 휴대폰 중독 및 휴대폰 비용에 대한 부담이 없다. 또한 기존 LBS 서비스들이 제공하던 부모→ 자녀의 단방향 소통이 아닌 자녀 ←→ 부모의 양방향 통신을 제공하기에 차별점/경쟁력을 가진다. 

## Structure

---

- NUGU speaker

    자녀의 발화 분석 (Intent & Entity)

    Backend server에 위치 정보 요청

    Backend server에 로그 생성 요청

    부모 위치 정보 응답

    요청 정상 전달 응답

- Backend proxy server

    부모의 최근 위치를 기반으로 상태 분석 (ML - randomForest 사용)

    Application에 NUGU speaker의 요청 로그 전달

    NUGU speaker에 부모의 상태와 위치 정보 전달

- Application

    회사와 집의 위도와 경도 설정

    NUGU speaker로 자신을 찾은 아이의 요청 확인

    Backend server에 최근 위치 전송

![FAFA%20b9b6afc0e4184bc78f6b80fdb7fbff23/Untitled.png](FAFA%20b9b6afc0e4184bc78f6b80fdb7fbff23/Untitled.png)

## UI

---

### VUI (Voice User Interface)

NUGU speaker를 사용하는 자녀

![FAFA%20b9b6afc0e4184bc78f6b80fdb7fbff23/VUI.png](FAFA%20b9b6afc0e4184bc78f6b80fdb7fbff23/VUI.png)

### GUI (Graphical User Interface)

Application을 사용하는 부모

*최근 위치 정보는 100m 이동 시마다 자동으로 서버에 전송*

![FAFA%20b9b6afc0e4184bc78f6b80fdb7fbff23/GUI.png](FAFA%20b9b6afc0e4184bc78f6b80fdb7fbff23/GUI.png)

## Contributors

---

박형진 - Back-end 개발 및 배포 (Django / DRF)

[이준석](https://github.com/junslee0912) - ML 기법 활용 및 데이터셋 수집

[이정선](https://github.com/sseonnn) - NUGU 개발 및 배포 

[윤승권](https://github.com/sgwon96) - Front-end 개발 (React Native)