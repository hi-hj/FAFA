from django.db import models
from django.conf import settings
from django.utils import timezone

# Create your models here.


class User(models.Model):
    FAMILY_ROLE = [('엄마', '엄마'), ('아빠', '아빠'),]
    username = models.CharField(max_length=10, unique=True)
    role = models.CharField(max_length=5, choices=FAMILY_ROLE)
    
    def __str__(self):
        return self.username


class SetLocation(models.Model):
    user_id = models.OneToOneField('User', on_delete=models.CASCADE)
    homeX = models.FloatField()
    homeY = models.FloatField()
    companyX = models.FloatField()
    companyY = models.FloatField()


class Location(models.Model):
    user_id = models.ForeignKey('User', on_delete=models.CASCADE)
    geoX = models.FloatField()
    geoY = models.FloatField()
    timeStamp = models.DateTimeField(auto_now_add=True)
    onHomeRoad = models.IntegerField()
    onCompanyRoad = models.IntegerField()


class Alert(models.Model):
    user_id = models.ForeignKey('User', on_delete=models.CASCADE)
    alertType = models.IntegerField()
    timeStamp = models.DateTimeField(auto_now_add=True)
