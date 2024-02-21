from rest_framework import serializers
from . import models

class AdSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Ad
        fields = "__all__"
    