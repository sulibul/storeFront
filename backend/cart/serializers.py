from products.models import Product
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from .models import Order, Positsion


class CartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["product"]


class PositsionSerializer(serializers.ModelSerializer):
    product_img = serializers.CharField(source="product.product_img")
    product_name = serializers.CharField(source="product.name")
    product_brand = serializers.CharField(source="product.company.name")

    class Meta:
        model = Positsion
        fields = ["product_name", "quantity", "price", "product_img", "product_brand"]


class OrderSerializer(serializers.ModelSerializer):
    positions = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ["order_id", "positions"]  # Include other fields as needed

    def get_positions(self, obj):
        return PositsionSerializer(Positsion.objects.filter(order=obj), many=True).data
