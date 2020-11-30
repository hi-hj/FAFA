from .models import Location, SetLocation, Alert
from rest_framework import serializers

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('geoX','geoY', 'timeStamp')

class SetLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SetLocation
        fields = '__all__' 

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = ('user', 'alertType','timeStamp')
