from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import login, signup, test_token, MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('login/', login, name='login'),
    path('sign_up/', signup, name='signup'),
    path('test_token/', test_token, name='test_token'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
