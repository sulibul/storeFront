# django imports
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend

# models, filters, serializer etc.
from products.models import Product, Comment
from products.filters import ProductFilter
from products.serializers import ProductSerializer, CommentSerializer

# rest framework imports
from rest_framework import status, viewsets
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view


# all products view with a possibility of filtering
class ProductListAPIView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProductFilter

# one certain product view


class ProductAPIView(viewsets.ViewSet):

    def retrieve(self, request, pk=None):
        queryset = Product.objects.all()
        product = get_object_or_404(queryset, pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getComments(request, product_id=None):
    comments = Comment.objects.all()

    # check if any comments
    try:
        comments = Comment.objects.get(product_id=product_id)
        serializer = CommentSerializer(comments)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response({"no_comments": "no comments"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def searchForProducts(request):
    query = request.GET.get('query')
    multple_q = Q(Q(name__icontains=query) | Q(description__icontains=query) | Q(
        company__name__icontains=query) | Q(category__name__icontains=query))

    products = Product.objects.filter(multple_q)
    serializer = ProductSerializer(products, many=True)

    data = serializer.data
    return Response(data, status=status.HTTP_200_OK)
