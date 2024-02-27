from django.shortcuts import render
from rest_framework.decorators import api_view
from .serializers import SignUpSerializer, MyTokenObtainPairSerializer, UserInfoSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, 
from rest_framework.authtoken.models import Token
from rest_framework import status
from .models import CustomUser
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.


# @api_view(["POST"])
# def login(request):
#     user = get_object_or_404(CustomUser, email=request.data['email'])
#     if not user.check_password(request.data['password']):
#         return Response({'detail': "not found"}, status=status.HTTP_400_BAD_REQUEST)
#     token, created = Token.objects.get_or_create(user=user)
#     # serializer =
#     return Response({})


# @api_view(["POST"])
# def signup(request):
#     serializer = SignUpSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         user = CustomUser.objects.get(email=request.data['email'])
#         token = Token.objects.create(user=user)

#         user.set_password(request.data['password'])
#         user.save()
#         return Response({'token': token.key, 'user': serializer.data})
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def test_token(request):
    return Response({})


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def Userinfo(request ):
    user = request.user
    console.log(user)
    return Response({})