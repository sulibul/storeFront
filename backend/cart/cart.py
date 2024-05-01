from django.conf import settings
from products.models import Product
from products.serializers import ProductSerializer
from .models import Order, Positsion


class Cart:
    def __init__(self, request):
        if not request.session.session_key:
            request.session.create()

        self.session = request.session
        cart = self.session.get("cart")

        if cart == None:
            cart = self.session["cart"] = {}

        self.cart = cart

    def save(self):
        self.session.modified = True

    def add(self, product_id, quantity=1, override_quantity=False):
        product_id = str(product_id)
        cart_product = Product.objects.filter(id__exact=product_id)

        if not product_id in self.cart:
            self.cart[product_id] = {
                "product_price": cart_product[0].price,
                "product_quantity": quantity,
            }
            self.save()
        else:
            self.cart[product_id]["product_quantity"] += quantity
            self.save()
        if override_quantity == True:
            self.cart[product_id]["product_quantity"] = quantity

            self.save()

    def remove(self, product_id):
        product_id = str(product_id)
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()

    def __iter__(self):
        product_ids = self.cart.keys()
        cart_products = Product.objects.filter(id__in=product_ids)
        cart = self.cart.copy()

        for product in cart_products:
            cart[str(product.id)]["name"] = ProductSerializer(product).data["name"]
            cart[str(product.id)]["id"] = ProductSerializer(product).data["id"]
            cart[str(product.id)]["product_img"] = ProductSerializer(product).data[
                "product_img"
            ]

        for item in cart.values():
            item["product_price"] = float(item["product_price"])
            item["total_price"] = item["product_price"] * item["product_quantity"]
            yield item

    def __len__(self):
        return sum(item["product_quantity"] for item in self.cart.values())

    def get_total_price(self):
        return sum(
            float(item["product_price"]) * item["product_quantity"]
            for item in self.cart.values()
        )

    def clear(self):
        del self.session[settings.CART_SESSION_ID]
        self.save()

    def create_order(self):

        order = Order.objects.create(
            order_user=self.session["user_id"],
            order_total=self.get_total_price(),
            order_status="created",
        )

        for item in self.cart.values():
            Positsion.objects.create(
                product_id=item["id"],
                quantity=item["product_quantity"],
                order=order["id"],
                price=item["product_price"] * item["product_quantity"],
            )
        return order
