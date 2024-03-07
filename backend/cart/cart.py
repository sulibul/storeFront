from django.conf import settings
from products.models import Product
from products.serializers import ProductSerializer
from decimal import Decimal


class Cart:
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)

        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}

        self.cart = cart

    def save(self):
        self.session.modified = True

    def add(self, product, quantity=1, override_quantity=False):
        print(product['id'])
        product_id = str(product['id'])

        if not product_id in self.cart:
            self.cart[product_id] = {
                "product_price": str(product["price"]),
                "product_quantity": quantity
            }
        if override_quantity == True:
            self.cart[product_id]["product_quantity"] = quantity
        else:
            self.cart[product_id]["product_quantity"] += quantity
            self.save()

    def remove(self, product):
        product_id = str(product.id)
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()

    def __iter__(self):
        product_ids = self.cart.keys()
        cart_products = Product.objects.filter(id__in=product_ids)
        cart = self.cart.copy()

        for product in cart_products:
            cart[str(product.id)]["name"] = ProductSerializer(
                product).data["name"]

        for item in cart.values():
            item["product_price"] = Decimal(item["product_price"])
            item["total_price"] = item["product_price"] * \
                item["product_quantity"]
            yield item

    def __len__(self):
        return sum(item["product_quantity"] for item in self.cart.values())

    def get_total_price(self):
        return sum(Decimal(item["product_price"]) * item["product_quantity"] for item in self.cart.values())

    def clear(self):
        del self.session[settings.CART_SESSION_ID]
        self.save()
