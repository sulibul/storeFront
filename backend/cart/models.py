from django.db import models
from users.models import CustomUser


# Create your models here.
class Positsion(models.Model):
    product = models.ForeignKey("products.Product", on_delete=models.CASCADE)
    quantity = models.IntegerField()
    order = models.ForeignKey("Order", on_delete=models.CASCADE)

    @property
    def price(self):
        return self.product.price * self.quantity


class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    order_date = models.DateField(auto_now_add=True)
    order_status = models.CharField(max_length=20)
    order_total = models.DecimalField(max_digits=10, decimal_places=2)
    order_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.order_id)
