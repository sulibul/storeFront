from products.models import Product
from rest_framework import serializers


class CartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["product"]
