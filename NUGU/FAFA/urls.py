from rest_framework.routers import DefaultRouter
from django.urls import path, include
from FAFA import views

router = DefaultRouter()

router.register('location', views.LocationViewSet)
# router.register('feed_scribe', views.SubscribeVideoViewSet)
# router.register('upload_video', views.VideoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]