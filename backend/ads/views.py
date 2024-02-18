from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
from . import models


# Create your views here.

#Advertisments data  
class AdViewSet(viewsets.ModelViewSet):
    queryset = models.Ad.objects.all()
    serializer_class = serializers.AdSerializer