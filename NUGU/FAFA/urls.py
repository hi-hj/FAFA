from rest_framework.routers import DefaultRouter
from django.urls import path, include


from . import views

router = DefaultRouter()


router.register('location', views.LocationViewSet)
#router.register('answer.location', views.a1_location, basename='a1_location')

urlpatterns = [
    path('', include(router.urls)),
    path('health', views.health, name='health'),
    #path('ask.location', views.a1_location, name='ask.location'),
    path('ask.location', views.a2_location, name='ask.location'),
    path('a3_location', views.a3_location, name='a3_location'),
    #path('login/', views.login),

]
#router.register('answer.location', views.C1_LocationView, basename='C1_Location')


# router.register('feed_scribe', views.SubscribeVideoViewSet)
# router.register('upload_video', views.VideoViewSet)
