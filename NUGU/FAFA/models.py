from django.db import models
from django.conf import settings

# Create your models here.
class Location(models.Model):
    name = models.CharField(max_length=10)
    geoX = models.FloatField()
    geoY = models.FloatField()
    timeStamp = models.DateTimeField(auto_now_add=True)