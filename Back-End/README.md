# FAFA : Back-End
### Django RestFramework 기반 REST API
<div>
<img src="https://img.shields.io/badge/NUGU%20play-2.0-brightgreen?style=flat-square" />
</div>
<div>
<img src="https://img.shields.io/badge/Python-3.6-blue?style=flat-square" />
<img src="https://img.shields.io/badge/Django-2.1.1-blue?style=flat-square" />
<img src="https://img.shields.io/badge/DRF-3.11.0-blue?style=flat-square" />
<img src="https://img.shields.io/badge/SQlite-3.21.0-blue?style=flat-square" />
</div>

- - -

### DataBase : [models.py](https://github.com/HYUcoolguy/FAFA/blob/main/Back-End/FAFA/models.py)
<img src="../document/src/DataModel.png" height="500">

<details>
<summary>User : 부모에 대한 테이블</summary>

| 필드      | 타입  | 역할                          | 예시                   |
|:---:       |:---:   |---                          |---                    |
|`id`       |int    |(PK)사용자 고유 id 값         | 1, 2, 3...             |
|`user_name`|char   |Application 로그인 시 필요한 ID| 'mother', 'father' |
|`role`     |varchar|NUGU에서 전달 받은 Entity(FAMILY_NAME) | '엄마', '아빠'          |
</details>


<details>
<summary>SetLocation : 부모의 회사/집의 위치에 대한 테이블</summary>
    
| 필드      | 타입  | 역할                          | 예시                   |
|:---:        |:---:  |---                          |---                    |
|`id`       |int    |(PK) 고유 id 값        | 1, 2, 3...             |
|`user_id`  |int   |(FK) User 테이블의 id | 1, 2, 3 ... |
|`homeX`     |float|사용자의 집 위도| 36.1234  |
|`homeY`     |float|사용자의 집 경도 | 123.1234      |
|`companyX`     |float|사용자의 회사 위도 | 35.1234    |
|`companyY`   |float|사용자의 회사 경도 | 122.4567     |
</details>

<details>
<summary>Location : 부모의 최근 위치에 대한 테이블</summary>
    
| 필드      | 타입  | 역할                          | 예시                   |
|:---:        |:---:   |---                          |---                    |
|`id`       |int    |(PK) 고유 id 값        | 1, 2, 3...             |
|`user_id`  |int   |(FK) User 테이블의 id | 1, 2, 3 ... |
|`geoX`     |float|사용자의 현재 위도| 36.1234  |
|`geoY`     |float|사용자의 현재 경도 | 123.1234      |
|`timeStamp`     |date|사용자의 데이터를 저장한 시각 |2020-12-02T...    |
|`onHomeRoad`     |int|퇴근길 표시 (ML 사용)| 0, 1    |
|`onCompanyRoad`   |int|출근길 표시 (ML 사용)| 0, 1     |
</details>

<details>
<summary>Alert : NUGU speaker의 요청에 대한 테이블</summary>
    
| 필드      | 타입  | 역할                          | 예시                   |
|:---:        |:---:   |---                          |---                    |
|`id`       |int    |(PK) 고유 id 값        | 1, 2, 3...             |
|`user_id`  |int   |(FK) User 테이블의 id | 1, 2, 3 ... |
|`alertType`     |int|NUGU 스피커의 Intent 분류| 0, 1  |
|`timeStamp`     |date|자녀의 NUGU 스피커 요청을 저장한 시각 |2020-12-02T...    |
</details>



### API : [urls.py](https://github.com/HYUcoolguy/FAFA/blob/main/Back-End/FAFA/urls.py)

##### Application

| Address               | Method  | 설명|
|---                    |:---:    |---                          |
|`login`                |POST     |'user_name' 입력 시, 로그인 및 회원 정보 반환|
|`set_location`         |POST     |집&회사의 위도/경도 입력|
|`set_location/<user_id>` |PUT/PATCH|집&회사의 위도/경도 변경|
|`add_location`         |POST     |사용자의 현재 위치,시각,상태 저장|
|`alert`                |GET      |NUGU speaker(자녀)의 요청 로그 확인|

##### NUGU play

| Address          | Method  | 설명|
|---               |:---:  |---                          |
|`health`          |POST   |NUGU play의 연결 상태 확인 요청 처리 
|`location`        |POST   |부모 위치 파악하는 기본 action|
|`now_location`    |POST   |집&회사 근처인 경우|
|`between_location`|POST   |ML을 활용하여 출퇴근 여부 확인|
|`except_location` |POST   |집&회사 사이가 아닌 경우|
|`alert_NUGU`      |POST   |NUGU speaker(자녀)의 요청 로그 생성|


NUGU architecture
발화속도 100% -> 90%
문장 사이 묵음 구간 길이 600ms -> 800ms
외부 연동 서버
http://fafa-dev.ap-northeast-2.elasticbeanstalk.com

![../document/src/NUGUbuild.png](../document/src/NUGUbuild.png)

inform.home
예상 발화 : 엄마, 나 집이야 
| `발화예시`         | 엄마  | 나 집이야|
|---               |:---:  |---:|
|`분류`  |부모  |집 도착 알림|
|`Entity`| FAMILY_NAME| STATEMENT_HOME|

Back-end URL/alert_NUGU
method : POST
request
{
    "version": "2.0",
    "action": {
        "actionName": "alert_NUGU",
        "parameters": {
            "FAMILY_NAME": 
            { "type": "FAMILY_NAME", "value": "엄마"},
        }
    }
}

/alert_NUGU
Back-end -> views.alert -> 
def alert(request):
    # GET 'FAMILY_NAME' from NUGU speaker & database
    nugu_body   = json.loads(request.body, encoding='utf-8')
    FAMILY_NAME = nugu_body.get('action').get('parameters').get('FAMILY_NAME_').get('value')
    user_id     = User.objects.filter(role=FAMILY_NAME).values()[0]['id']
    context = {'FAMILY_NAME_': FAMILY_NAME}
    result  = {}
    result['version'] = nugu_body.get('version')
    result['resultCode'] = 'OK'
    result['output'] = context
    # make Alert log for parent
    Alert.objects.create(user_id_id=user_id,alertType=1)
    return JsonResponse(result)

save alert log to DB
result
    

response to NUGU
{
    "version": "2.0",
    "resultCode": "OK",
    "output": {
      "FAMILY_NAME": "엄마",
    },



| `응답예시`         | 엄마  | 에게 집에 왔다고 알려 드렸어요|
|---               |:---:  |---:|
|`Prompt`  |FAMILY_NAME  |fixed|







ask.location
예상 발화 : 엄마, 지금 어디야 
| `발화예시`         | 엄마  | 지금 어디야|
|---               |:---:  |---:|
|`분류`  |부모  |현재 위치 요청|
|`Entity`| FAMILY_NAME| STATEMENT_LOCATION|

Back-end URL/location
method : POST
request
{
    "version": "2.0",
    "action": {
        "actionName": "alert_NUGU",
        "parameters": {
            "FAMILY_NAME": 
            { "type": "FAMILY_NAME", "value": "엄마"},
        }
    }
}


Back-end -> views.location ->  now_location / between_locatio / except_location
# now_location
    if abs(now_X - home_X)<0.001 and abs(now_Y - home_Y)<0.0015:
        context = { 'FAMILY_NAME' : FAMILY_NAME,
                    'LOCATION'    : '집'
                    }
    elif abs(now_X - company_X)<0.001 and abs(now_Y - company_Y)<0.0015:
        context = { 'FAMILY_NAME' : FAMILY_NAME,
                    'LOCATION'     : '회사'
                    }
    # between_location
    elif now_X in numpy.arange(small_X, big_X) and now_Y in numpy.arange(small_Y, big_Y):
        # Machine Learning - randomForest method
        train       = pandas.read_csv('static/train.csv')
        X           = train[['geoX', 'geoY', 'time']]
        Y           = train[['onHomeRoad', 'onCompanyRoad']]
        forest      = RandomForestClassifier(n_estimators=100)
        forest.fit(X,Y)
        test        = numpy.array((now_X, now_Y, now_time)).reshape(1,3)
        ML_result   = forest.predict(test)
        # defined off work
        if ML_result[0][0] == 1 and ML_result[0][1] == 0:
            context = { 'FAMILY_NAME'    : FAMILY_NAME,
                        'START_LOCATION' : '회사',
                        'DESTI_LOCATION' : '집',
                        'STATUS'         : '퇴근하는'
                        }
        # defined on work
        elif ML_result[0][0] == 0 and ML_result[0][0] == 1:
            context = { 'FAMILY_NAME'    : FAMILY_NAME,
                        'START_LOCATION' : '집',
                        'DESTI_LOCATION' : '회사',
                        'STATUS'         : '출근하는'
                        }
    # except_location 
    elif now_X not in numpy.arange(small_X, big_X) and now_Y not in numpy.arange(small_Y, big_Y):
        context     = { 'FAMILY_NAME'    : FAMILY_NAME}
    else:
        context     = { 'FAMILY_NAME'    : FAMILY_NAME}

    result ={}
    result['version'] = nugu_body.get('version')
    result['resultCode'] = 'OK'
    result['output'] = context
    # make Alert log for parent
    Alert.objects.create(user_id_id=user_id,alertType=0)
    return JsonResponse(result)


save alert log to DB
result
    
response to NUGU
{
    "version": "2.0",
    "resultCode": "OK",
    "output": {
      "FAMILY_NAME": "엄마",
    },
