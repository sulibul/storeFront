from django.shortcuts import render
from rest_framework.decorators import api_view
from .serializers import (
    SignUpSerializer,
    MyTokenObtainPairSerializer,
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status
from .models import CustomUser
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.


@api_view(["POST"])
def signup(request):
    serializer = SignUpSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"info": "user is successfully created"})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
