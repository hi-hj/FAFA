import json
import requests
import pprint
import numpy

from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.http import JsonResponse
from django.core import serializers
from django.forms.models import model_to_dict

from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.filters import SearchFilter
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework import viewsets


from .models import User, Location, SetLocation, Alert
from .serializers import UserSerializer ,LocationSerializer, SetLocationSerializer, AlertSerializer

# NUGU - helath check
def health(request):
    return JsonResponse({'STATUS': '200 OK'}, status=200)

# NUGU - ask.location
def location(request):
    result ={}
    nugu_body = json.loads(request.body, encoding='utf-8')
    pprint.pprint(nugu_body)
    FAMILY_NAME = nugu_body.get('action').get('parameters').get('FAMILY_NAME').get('value')

    # LOCATION 상황에 맞게 context 조정하는 함수 필요
    context = {'FAMILY_NAME'     : FAMILY_NAME,
                'START_LOCATION' : '집',
                'DESTI_LOCATION' : '회사',
                'STATUS'         : '출근하는'}
    
    result['version'] = nugu_body.get('version')
    result['resultCode'] = 'OK'
    result['output'] = context

    
    user_id = User.objects.filter(role=FAMILY_NAME).values()[0]['id']
    # Alert(0) : '아이가 찾고 있어요' 
    Alert.objects.create(user_id_id=user_id,alertType=0)
    return JsonResponse(result)

# NUGU - inform.home
def alert(request):
    result ={}
    nugu_body = json.loads(request.body, encoding='utf-8')
    #pprint.pprint(nugu_body)
    FAMILY_NAME = nugu_body.get('action').get('parameters').get('FAMILY_NAME_').get('value')
    #엄마 -> User -> id 찾기
    # LOCATION 상황에 맞게 context 조정하는 함수 필요
    context = {'FAMILY_NAME_': FAMILY_NAME}
    
    result['version'] = nugu_body.get('version')
    result['resultCode'] = 'OK'
    result['output'] = context

    user_id = User.objects.filter(role=FAMILY_NAME).values()[0]['id']
    # Alert(0) : '아이가 찾고 있어요' 
    Alert.objects.create(user_id_id=user_id,alertType=1)
    return JsonResponse(result)


# Front - User / Location / Alert
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
    # Alert.objects.create(user='test',alertType=1)


#   Front - login
def login(request):
    req_body = json.loads(request.body, encoding='utf-8')
    username = req_body.get('username')
    user = User.objects.filter(username=username)
    result ={}
    if user.exists():
        user_id = user.values()[0]['id']
        set_location = SetLocation.objects.filter(user_id=user_id)
        result = {'id' : user_id,
                'role' : user.values()[0]['role'],
                'homeX' : set_location.values()[0]['homeX'],
                'homeY' : set_location.values()[0]['homeY'],
                'companyX' : set_location.values()[0]['companyX'],
                'companyY' : set_location.values()[0]['companyY']
                }
    # if not exists, return {}
    return JsonResponse(result)


def test_location(request):
    now_location = Location.objects.filter(user_id=1).last()
    set_location = SetLocation.objects.filter(user_id=1)
    
    now_X = now_location.geoX
    now_Y = now_location.geoY
    home_X = set_location.values()[0]['homeX']
    home_Y = set_location.values()[0]['homeY']
    company_X = set_location.values()[0]['companyX']
    company_Y = set_location.values()[0]['companyY']
    # To use numpy's 'arrange' func
    big_X = max(home_X, company_X)
    small_X = min(home_X, company_Y)
    big_Y =max(home_Y, company_Y)
    small_Y = min(home_Y, company_Y)
    LOCATION =''
    # near home & company
    if abs(now_X - home_X)<0.001 and abs(now_Y - home_Y)<0.0015:
        LOCATION = '집'
    elif abs(now_X - company_X)<0.001 and abs(now_Y - company_Y)<0.0015:
        LOCATION = '회사'
    # not in boundary of home & company. 
    elif now_X not in numpy.arange(small_X, big_X) and now_Y not in numpy.arange(small_Y, big_Y):
        print('외출 중이에요')

    # NEED BETWEEN-LOCATION ALGORITHM!
    
    print(LOCATION)
    
    
    
    context = {}
    context['LOCATION'] = LOCATION
    # FAMILY_NAME = '엄마'
    # user_id = User.objects.filter(role=FAMILY_NAME).values()[0]['id']
    # Alert.objects.create(user_id_id=user_id, alertType=0)
    return JsonResponse(context)




    # cnt = Location.objects.all().count()
    # now_location = Location.objects.get(pk=cnt)
    # #print(now_location.values())
    # now_dict = model_to_dict(now_location)
    # print(now_dict['geoX'])
    # print(now_dict['geoY'])
    
    #if now_dict['geoX']-
    #set_dict = model_to_dict(set_location)
    #print(set_location.values()[0]['homeX'])
    # now_location = model_to_dict(now_location)
    # serialized = json.dumps(now_location, ensure_ascii = False)
    # print(serialized)
    # context= json.dumps(context)

    # counter = Location.objects.all().count()
#     context = Location.objects.get(pk=counter)
#     con_dict = model_to_dict(context)
#     context = json.dumps(con_dict, ensure_ascii=False, sort_keys=False, separators=(',', ':')).encode('utf-8'
    # now_location = model_to_dict(now_location)
    # set_location = model_to_dict(set_location)
# dict_obj = model_to_dict(context)
# serialized = json.dumps(dict_obj, ensure_ascii = False)
    # print(now_location)
    # print(set_location)
    # result['output'] = json.loads(context, encoding='utf-8')

    #return JsonResponse(now_dict)




# def login(request):
#     return render(request, 'FAFA/login.html')

# def a2_location(request):
#     result = {}
#     nugu_body = json.loads(request.body, encoding='utf-8')
#     pprint.pprint(nugu_body)
#     result = nugu_body
#     result['resultCode'] = 'OK'
#     result['output'] = {'name':'회사'}
#     pprint.pprint(result)
#     return JsonResponse(result)

# def a3_location(request):
#     result ={}
#     nugu_body = json.loads(request.body, encoding='utf-8')
#     pprint.pprint(nugu_body)
#     FAMILY_NAME = nugu_body.get('action').get('parameters').get('FAMILY_NAME').get('value')
#     result['version'] = nugu_body.get('version')
#     result['resultCode'] = 'OK'
#     result['output'] = {'FAMILY_NAME':FAMILY_NAME,
#                         'name':'회사' }
#     return JsonResponse(result)


# def a1_location(request):
#     result = {}
#     counter = Location.objects.all().count()
#     context = Location.objects.get(pk=counter)
#     con_dict = model_to_dict(context)
#     context = json.dumps(con_dict, ensure_ascii=False, sort_keys=False, separators=(',', ':')).encode('utf-8')
#     result['version'] ='2.0'
#     result['resultCode'] = 'OK'
#     result['output'] = json.loads(context, encoding='utf-8')
#     return JsonResponse(result)    
    #result['STATUS'] ='200 OK'
    # context = Location.objects.filter(name='회사')[0]
    # dict_obj = model_to_dict(context)
    # serialized = json.dumps(dict_obj, ensure_ascii = False)
    # #all().latest('timeStamp')[0]
    # print(serialized)
    #context= json.dumps(context)
    #print(context)

    
    
    #c1 = Location.objects.get(pk=counter)
    #c1 = Location.objects.all().reverse()[:1].get()


    #context = Location.objects.filter(name='회사')[0]

    #pprint.pprint(request)
    #pprint.pprint(request.body)
    #nugu_body = json.loads(request.body, encoding='utf-8')
    #print(nugu_body)
    #context = Location.objects.all().order_by('-id')[:1].name
    #print(context)
    #result = nugu_body
    #result = request
    #result['output'] = context
    #result['resultCode'] = 'OK'
    #result = json.loads(request.body, encoding='utf-8')
    #result =json.request.body
    # order_by('-id')[:1]
    # objects.all().latest()
    #result['output'] = context.name


# class C1_LocationView(APIView):
#     renderer_classes = (JSONRenderer,)

#     def get(self, request, format=None):
#         result = self.request.body
#         print(result)
#         location_name = Location.objects.all().order_by('-id')[:1].name
#         print(location_name)
#         result = {'location_name' : location_name}
#         result = {'resultCode' : 'OK'}
#         return Response(result)
    
#     @classmethod
#     def get_extra_actions(cls):
#         return []
    # queryset = Location.objects.all().order_by('-id')[:1]
    # serializer_class = LocationSerializer
    
    # def perform_create(self, serializer):
    #     nugu_body = self.request.body
    #     nugu_body['output'] = 
    #     result['output'] ={'l_name' : name}
    #     result['resultCode'] = 'OK'
        
# class C1LocationViewSet(viewsets.ModelViewSet):
#     queryset = Location.objects.all().order_by('-id')[:1]
#     serializer_class = LocationSerializer
    
#     def perform_create(self, serializer):
#         nugu_body = self.request.body
#         nugu_body['output'] = 
#         result['output'] ={'l_name' : name}
#         result['resultCode'] = 'OK'
        
    # def get_serializer_context(self):
    #     context = super(C1LocationViewSet, self).get_serializer_context()
    #     context.update({"request": self.request})
    #     print(context)
    #     return context

    #Humidity.objects.all().latest()
    #serializer_class = LocationSerializer

    # def get_queryset(self):
    #     qs = super().get_queryset()
    #     print(qs)
    #     return qs
#queryset = Location.objects.all().order_by('timeStamp').last()



