from products.models import Product
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from .models import Order, Positsion


class CartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["product"]


class PositsionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Positsion
        fields = ["product", "quantity", "price"]


class OrderSerializer(serializers.ModelSerializer):
    positions = SerializerMethodField(source="get_positsions")

    class Meta:
        model = Order
        fields = ["order_id", "positsions"]  # Include other fields as needed

    def get_positsions(self):
        request = self.context.get("request")
        order_id = request.order_id
        return PositsionSerializer(
            Positsion.objects.filter(order=order_id), many=True
        ).data
