from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .cart import Cart
from .models import Order
from .serializers import OrderSerializer
from rest_framework_simplejwt.backends import TokenBackend
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.authentication import TokenAuthentication


class CartApiView(APIView):

    def get(self, request):
        cart = Cart(request)
        return Response(
            {
                "data": list(cart.__iter__()),
                "cart_total_price": cart.get_total_price(),
                "number_of_all_products": cart.__len__(),
            },
            status=status.HTTP_200_OK,
        )

    def post(self, request, **kwargs):
        cart = Cart(request)

        if "remove" in request.data:
            product_id = request.data["id"]
            cart.remove(product_id)

        elif "clear" in request.data:
            cart.clear()

        else:
            product = request.data
            cart.add(
                product_id=product["id"],
                quantity=int(product["quantity"]),
                override_quantity=(
                    product["override_quantity"]
                    if "override_quantity" in product
                    else False
                ),
            )

        return Response({"message": "cart updated"}, status=status.HTTP_202_ACCEPTED)


class OrderApiView(APIView):

    def get(self, request):
        user_id = request.headers["user-id"]
        orders = Order.objects.filter(order_user=user_id)
        serializer = OrderSerializer(orders, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user_id = request.headers["user-id"]
        cart = Cart(request)
        order = cart.create_order(request, user_id)

        return Response({"order_id": order.order_id}, status=status.HTTP_201_CREATED)
