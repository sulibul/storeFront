from django.db import models
from users.models import CustomUser

Choices = [(i, i) for i in range(11)]


class Company(models.Model):
    name = models.CharField(max_length=30, unique=True)
    img_url = models.URLField(max_length=200)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=100)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.CharField(max_length=100)
    price = models.FloatField()
    product_img = models.URLField(max_length=200)

    def __str__(self):
        return self.name

    def get_price(self):
        return self.price


class Comment(models.Model):
    author = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, null=True, blank=True
    )
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, null=True, blank=True
    )
    text = models.TextField(max_length=200, null=True)
    rating = models.IntegerField(choices=Choices)
    updated_at = models.DateTimeField(auto_now=True)
