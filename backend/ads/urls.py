from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('ad', views.AdViewSet, basename='ad')

urlpatterns = [
]

urlpatterns += router.urls
