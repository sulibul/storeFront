from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('ad', views.AdViewSet, basename='ad')

urlpatterns = [
]

urlpatterns += router.urls