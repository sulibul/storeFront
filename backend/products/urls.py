from . import views
from rest_framework import routers
from django.urls import path

urlpatterns = [
    path('products', views.ProductListAPIView.as_view(), name='products'),
    path('products/<int:pk>',
         views.ProductAPIView.as_view({'get': 'retrieve'}), name='product'),
    path('comments/<int:product_id>',
         views.getComments, name='comments'),
    path('products/search', views.searchForProducts, name='search')
]
