from .models import Location
from rest_framework import serializers

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('name', 'geoX','geoY', 'timeStamp')

#class C1LocationSerializer(serializers.ModelSerializer):
