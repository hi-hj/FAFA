from rest_framework.routers import DefaultRouter
from django.urls import path, include


from . import views

router = DefaultRouter()


router.register('location', views.LocationViewSet)
#router.register('answer.location', views.a1_location, basename='a1_location')

urlpatterns = [
    path('', include(router.urls)),
    path('health', views.health, name='health'),
    path('a1_location', views.a1_location, name='a1_location'),
    path('login/', views.login),

]
#router.register('answer.location', views.C1_LocationView, basename='C1_Location')


# router.register('feed_scribe', views.SubscribeVideoViewSet)
# router.register('upload_video', views.VideoViewSet)
