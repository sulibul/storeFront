from . import views
from rest_framework import routers
from django.urls import path

# router = routers.DefaultRouter()
# router.register('products', views.ProductListAPIView,
#                 basename='products')

urlpatterns = [
    path('products', views.ProductListAPIView.as_view())
]

# urlpatterns += router.urls
