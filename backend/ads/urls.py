from rest_framework import routers
from . import views
from django.urls import path

urlpatterns = [
    # end point for getting a ads
    path('ad/', views.AdViewSet.as_view({'get': 'list'}), name='ads')
]
