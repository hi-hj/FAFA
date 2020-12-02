from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from rest_framework import urls
# from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from FAFA import urls

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/token/', obtain_jwt_token),
    # path('api/token/verify/', verify_jwt_token),
    # path('api/token/refresh/', refresh_jwt_token),
    path('', include('FAFA.urls')),
]
