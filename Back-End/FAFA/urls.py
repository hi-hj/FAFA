from rest_framework.routers import DefaultRouter
from django.urls import path, include


from . import views

router = DefaultRouter()

# FRONT-END & MAKING TEST DATA
router.register('add_location', views.LocationViewSet)
router.register('set_location', views.SetLocationViewSet)
router.register('alert', views.AlertViewSet)
router.register('user', views.UserViewSet) 

urlpatterns = [
    path('', include(router.urls)),
    path('health', views.health, name='health'),
    # NUGU : ask.location
    path('location', views.location, name="location"),
    path('now_location', views.location, name="location"),
    path('between_location', views.location, name="location"),
    path('except_location', views.location, name="location"),
    # NUGU : inform.home
    path('alert_NUGU', views.alert, name="alert"),
    # FRONT-END : login
    path('login', views.login, name="login"),
    # TEST IN LOCAL
    path('test', views.test_location, name="test"),
]
