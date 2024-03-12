from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .cart import Cart
from django.views.decorators.cache import never_cache
from django.utils.decorators import method_decorator
decorators = [never_cache,]


# Create your views here.

@method_decorator(decorators, name='get')
class CartApiView(APIView):

    def get(self, request, format=None):
        cart = Cart(request)
        return Response({"data": list(cart.__iter__()),
                         "cart_total_price": cart.get_total_price(),
                         "number_of_all_products": cart.__len__()}, status=status.HTTP_200_OK)

    def post(self, request, **kwargs):
        cart = Cart(request)
        cart.cart
        if "remove" in request.data:
            product_id = request.data["id"]
            cart.remove(product_id)

        elif "clear" in request.data:
            cart.clear()

        else:
            product = request.data
            cart.add(product_id=product["id"],
                     quantity=int(product["quantity"]),
                     override_quantity=product["override_quantity"] if
                     "override_quantity" in product else False
                     )
            # print(request.session['cart'])

        return Response(
            {"message": "cart updated"},
            status=status.HTTP_202_ACCEPTED)
