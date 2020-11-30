from rest_framework.routers import DefaultRouter
from django.urls import path, include


from . import views

router = DefaultRouter()


router.register('add_location', views.LocationViewSet)
router.register('set_location', views.SetLocationViewSet)
router.register('alert', views.AlertViewSet) # Front-End
#router.register('answer.location', views.a1_location, basename='a1_location')

urlpatterns = [
    path('', include(router.urls)),
    path('health', views.health, name='health'),
    path('location', views.location, name="location"),
    path('now_location', views.location, name="location"),
    path('between_location', views.location, name="location"),
    path('except_location', views.location, name="location"),

    path('alert_NUGU', views.alert, name="alert"), # NUGU-PLAY
    path('test', views.test_location, name="test"),
    #path('login/', views.login),
    #path('ask.location', views.a1_location, name='ask.location'),
    # path('ask.location', views.a2_location, name='ask.location'),
    # path('a3_location', views.a3_location, name='a3_location'),
]
#router.register('answer.location', views.C1_LocationView, basename='C1_Location')


# router.register('feed_scribe', views.SubscribeVideoViewSet)
# router.register('upload_video', views.VideoViewSet)
