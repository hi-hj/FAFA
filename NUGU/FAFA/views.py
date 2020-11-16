from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect

from rest_framework.filters import SearchFilter
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets


from .models import Location
from .serializers import LocationSerializer
# Create your views here.

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer