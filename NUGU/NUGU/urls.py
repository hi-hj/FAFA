from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from rest_framework import urls

from FAFA import urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('FAFA.urls')),
]
