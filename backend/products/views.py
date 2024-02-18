from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from products.models import Product
from products.filters import ProductFilter
from products.forms import ProductForm
from products.serializers import ProductSerializer
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.

# def indexProduct(request):
#     product_filter = ProductFilter(request.GET, queryset=Product.objects.all())

#     context = {
#         'form': product_filter.form,
#         'products': product_filter.qs
#     }


class ProductListAPIView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProductFilter
