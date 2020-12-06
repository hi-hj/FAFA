from .models import User, Location, SetLocation, Alert
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class SetLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SetLocation
        fields = ('user_id','homeX', 'homeY','companyX','companyY')

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('user_id', 'geoX','geoY', 'onHomeRoad', 'onCompanyRoad','timeStamp')

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = ('alertType','timeStamp')
