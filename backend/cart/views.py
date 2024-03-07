from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .cart import Cart
# Create your views here.


class CartApiView(APIView):

    def get(self, request, format=None):
        cart = Cart(request)
        return Response({"data": list(cart.__iter__()),
                         "cart_total_price": cart.get_total_price(),
                         "number_of_all_products": cart.__len__()}, status=status.HTTP_200_OK)

    def post(self, request, **kwargs):
        cart = Cart(request)

        if "remove" in request.data:
            product = request.data["product"]
            cart.remove(product)

        elif "clear" in request.data:
            cart.clear()

        else:
            product = request.data
            # print(product)
            cart.add(product_id=product["product_id"],
                     quantity=product["quantity"],
                     override_quantity=product["override_quantity"] if
                     "override_quantity" in product else False
                     )

        return Response(
            {"message": "cart updated"},
            status=status.HTTP_202_ACCEPTED)
