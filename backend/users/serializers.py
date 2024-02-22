from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'name', 'password', 'surname',
                  'date_of_birth', 'city', 'post_code', 'street']

    def create(self, validated_data):
        return CustomUser.objects.create(validated_data)

    def validate(self, attrs):
        return super().validate(attrs)
