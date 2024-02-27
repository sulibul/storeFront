from django.shortcuts import render, get_object_or_404
from rest_framework.generics import ListAPIView
from products.models import Product, Comment
from products.filters import ProductFilter
from products.serializers import ProductSerializer, CommentSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
# from products.forms import ProductForm

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


class ProductAPIView(viewsets.ViewSet):

    def retrieve(self, request, pk=None):
        queryset = Product.objects.all()
        product = get_object_or_404(queryset, pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)


@api_view(['GET'])
def getComments(request, product_id=None):
    comments = Comment.objects.all()
    try:
        comments = Comment.objects.get(product_id=product_id)
    except:
        comments = None
    serializer = CommentSerializer(comments)
    return Response(serializer.data)
