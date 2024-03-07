from rest_framework import serializers
from . import models


class AdSerializer(serializers.ModelSerializer):
    """Class representing a Advertisment serializer"""
    class Meta:
        model = models.Ad
        fields = "__all__"
