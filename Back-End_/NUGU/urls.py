from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import urls

from FAFA import urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('FAFA.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
