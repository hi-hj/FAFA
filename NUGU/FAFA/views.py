import json
import requests
import pprint

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


from .models import Location
from .serializers import LocationSerializer
# Create your views here.

def health(request):
    return JsonResponse({'STATUS': '200 OK'}, status=200)

def a1_location(request):
    # result ={}
    # context = Location.objects.filter(name='회사')[0]
    # dict_obj = model_to_dict(context)
    # serialized = json.dumps(dict_obj, ensure_ascii = False)
    # #all().latest('timeStamp')[0]
    # print(serialized)
    #context= json.dumps(context)
    #print(context)

    
    
    #c1 = Location.objects.get(pk=counter)
    #c1 = Location.objects.all().reverse()[:1].get()

    result = {}
    counter = Location.objects.all().count()
    context = Location.objects.get(pk=counter)
    #context = Location.objects.filter(name='회사')[0]
    con_dict = model_to_dict(context)
    context = json.dumps(con_dict, ensure_ascii=False, sort_keys=False, separators=(',', ':')).encode('utf-8')
    result['version'] ='2.0'
    result['output'] = json.loads(context, encoding='utf-8')
    result['STATUS'] ='200 OK'
    result['resultCode'] = 'OK'
    return JsonResponse(result)
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


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer