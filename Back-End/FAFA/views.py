import json
import requests
import numpy 
import pandas
from django.http import JsonResponse
from rest_framework import status, viewsets
from sklearn.ensemble import RandomForestClassifier
from .models import User, Location, SetLocation, Alert
from .serializers import UserSerializer ,LocationSerializer, SetLocationSerializer, AlertSerializer


##### NUGU #####
# helath check
def health(request):
    return JsonResponse({'STATUS': '200 OK'}, status=200)

# ask.location
def location(request):
    # GET 'FAMILY_NAME' from NUGU speaker
    nugu_body    = json.loads(request.body, encoding='utf-8')
    FAMILY_NAME  = nugu_body.get('action').get('parameters').get('FAMILY_NAME').get('value')
   # GET data from database
    user_id      = User.objects.filter(role=FAMILY_NAME).values()[0]['id']
    now_location = Location.objects.filter(user_id=user_id).last()
    set_location = SetLocation.objects.filter(user_id=user_id)
    now_X        = now_location.geoX
    now_Y        = now_location.geoY
    now_time     = int(now_location.timeStamp.hour * 60) + int(now_location.timeStamp.minute)
    now_home     = now_location.onHomeRoad
    now_company  = now_location.onCompanyRoad
    home_X       = set_location.values()[0]['homeX']
    home_Y       = set_location.values()[0]['homeY']
    company_X    = set_location.values()[0]['companyX']
    company_Y    = set_location.values()[0]['companyY']
    # To use numpy's 'arrange' func
    big_X        = max(home_X, company_X)
    small_X      = min(home_X, company_Y)
    big_Y        = max(home_Y, company_Y)
    small_Y      = min(home_Y, company_Y)
    # To use randomForest
    train        = pandas.read_csv('static/train.csv')
    X            = train[['geoX', 'geoY', 'time']]
    Y            = train[['onHomeRoad', 'onCompanyRoad']]
    forest       = RandomForestClassifier(n_estimators=100)
    forest.fit(X,Y)
    test         = numpy.array((now_X, now_Y, now_time)).reshape(1,3)
    ML_result    = forest.predict(test)


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
    ## defined off work
    elif (now_home ==1 and now_company ==0) or (ML_result[0][0] == 1 and ML_result[0][1] == 0):
        context = { 'FAMILY_NAME'    : FAMILY_NAME,
                    'START_LOCATION' : '회사',
                    'DESTI_LOCATION' : '집',
                    'STATUS'         : '퇴근하는'
                    }
    ## defined on work
    elif (now_home ==0 and now_company ==1) or (ML_result[0][0] == 0 and ML_result[0][1] == 1):
        context = { 'FAMILY_NAME'    : FAMILY_NAME,
                    'START_LOCATION' : '집',
                    'DESTI_LOCATION' : '회사',
                    'STATUS'         : '출근하는'
                    }
    # except_location
    elif not(small_X < now_X < big_X) and not(small_Y < now_Y < big_Y):
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


# inform.home
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


##### FRONT-END #####
# CRUD data
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class SetLocationViewSet(viewsets.ModelViewSet):
    queryset = SetLocation.objects.all()
    serializer_class = SetLocationSerializer

class AlertViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer

# LOG IN
def login(request):
    req_body    = json.loads(request.body, encoding='utf-8')
    username    = req_body.get('username')
    user        = User.objects.filter(username=username)
    
    result ={}
    if user.exists():
        user_id      = user.values()[0]['id']
        set_location = SetLocation.objects.filter(user_id=user_id)
        result       = {'id'     : user_id,
                        'role'     : user.values()[0]['role'],
                        'homeX'    : set_location.values()[0]['homeX'],
                        'homeY'    : set_location.values()[0]['homeY'],
                        'companyX' : set_location.values()[0]['companyX'],
                        'companyY' : set_location.values()[0]['companyY']
                        }
    return JsonResponse(result)


##### TEST IN LOCAL #####
def test_location(request):

    #nugu_body    = json.loads(request.body, encoding='utf-8')
    FAMILY_NAME  = '아빠'
    #nugu_body.get('action').get('parameters').get('FAMILY_NAME').get('value')
   # GET data from database
    user_id      = User.objects.filter(role=FAMILY_NAME).values()[0]['id']
    print(user_id)


    now_location = Location.objects.filter(user_id=user_id).last()
    set_location = SetLocation.objects.filter(user_id=user_id)
    now_X        = now_location.geoX
    now_Y        = now_location.geoY
    now_time     = int(now_location.timeStamp.hour * 60) + int(now_location.timeStamp.minute)
    now_home     = now_location.onHomeRoad
    now_company  = now_location.onCompanyRoad
    
    home_X       = set_location.values()[0]['homeX']
    home_Y       = set_location.values()[0]['homeY']
    company_X    = set_location.values()[0]['companyX']
    company_Y    = set_location.values()[0]['companyY']

    # To use numpy's 'arrange' func
    big_X        = max(home_X, company_X)
    small_X      = min(home_X, company_Y)
    big_Y        = max(home_Y, company_Y)
    small_Y      = min(home_Y, company_Y)
    LOCATION     = ''
    # To use randomForest
    train        = pandas.read_csv('static/train.csv')
    X            = train[['geoX', 'geoY', 'time']]
    Y            = train[['onHomeRoad', 'onCompanyRoad']]
    forest       = RandomForestClassifier(n_estimators=100)
    forest.fit(X,Y)
    test         = numpy.array((now_X, now_Y, now_time)).reshape(1,3)
    ML_result    = forest.predict(test)
    

    if abs(now_X - home_X)<0.001 and abs(now_Y - home_Y)<0.0015:
        LOCATION = '집'
    elif abs(now_X - company_X)<0.001 and abs(now_Y - company_Y)<0.0015:
        LOCATION = '회사'
    elif (now_home ==1 and now_company ==0) or (ML_result[0][0] == 1 and ML_result[0][1] == 0):
        LOCATION = '집 오는 중'
    elif (now_home ==0 and now_company ==1) or (ML_result[0][0] == 0 and ML_result[0][1] == 1):
        LOCATION = '회사 오는 중'  
    elif not(small_X < now_X < big_X) and not(small_Y < now_Y < big_Y):
        print('외출 중이에요')
    else:
        print('외출 중이에요')
    print('error?')
    print(LOCATION)

    context = {}
    context['LOCATION'] = LOCATION
    return JsonResponse(context)