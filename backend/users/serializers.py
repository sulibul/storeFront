# from django.contrib.auth import get_user_model, authenticate
# from rest_framework import serializers
# from .models import CustomUser
# from django.contrib.auth.password_validation import validate_password


# class SignUpSerializer(serializers.ModelSerializer):
#     # password2 = serializers.CharField(
#     #     style={'input_type': 'password'}, write_only=True)

#     class Meta:
#         model = CustomUser
#         fields = ['email', 'password',
#                   'name',  'surname',
#                   'date_of_birth', 'city', 'post_code', 'street']
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }

#     def save(self, **kwargs):
#         password = self.validated_data['password']
#         # password2 = self.validated_data['password2']
#         # if password != password2:
#         #     raise serializers.ValidationError({'Error': 'password dont match'}
#         #                                       )
#         if CustomUser.objects.filter(email=self.validated_data['email']).exists:
#             raise serializers.ValidationError(
#                 {'Error': 'We have account with this email'})
#         user = CustomUser(email=self.validated_data['email'], name=self.validated_data['name'], surname=self.validated_data['surname'],
#                           date_of_birth=self.validated_data['date_of_birth'], city=self.validated_data['city'], post_code=self.validated_data['post_code'], password=self.validated_data['street'],)
#         user.set_password(password)
#         user.save()

#         return user

from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['id'] = user.id
        # ...

        return token


CustomUser = get_user_model()


class SignUpSerializer(serializers.ModelSerializer):
    # password2 = serializers.CharField(
    #     style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'password',
                  'name', 'surname', 'date_of_birth', 'city', 'post_code', 'street']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        # if data['password'] != data.pop('password2'):
        #     raise serializers.ValidationError(
        #         {'password': "Passwords don't match"})
        validate_password(data['password'])
        return data

    def create(self, validated_data):
        # remove password2 from data to prevent trying to create user with it
        # validated_data.pop('password2')
        return CustomUser.objects.create_user(**validated_data)


class UserInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['email', 'password',
                  'name', 'surname', 'date_of_birth', 'city', 'post_code', 'street']
