from . import views
from rest_framework import routers
from django.urls import path

router = routers.DefaultRouter()
# router.register('products', views.ProductListAPIView,
#                 basename='products')

urlpatterns = [
    path('products', views.ProductListAPIView.as_view()),
    path('products/<int:pk>',
         views.ProductAPIView.as_view({'get': 'retrieve'})),
    path('comments/<int:product_id>',
         views.getComments, name='comments')
]

# urlpatterns += router.urls
