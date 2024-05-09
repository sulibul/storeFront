from . import views
from django.urls import path

urlpatterns = [
    path("", views.CartApiView.as_view(), name="cart"),
    path("order/", views.OrderApiView.as_view(), name="order"),
]
