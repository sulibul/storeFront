from rest_framework import serializers
from . import models


class ProductSerializer(serializers.ModelSerializer):
    # return names instead of ids
    company = serializers.CharField(source="company.name", read_only=True)
    category = serializers.CharField(source="category.name", read_only=True)
    company_id = serializers.CharField(source="company.id", read_only=True)
    category_id = serializers.CharField(source="category.id", read_only=True)

    class Meta:
        model = models.Product
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = "__all__"


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Company
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="author.name", read_only=True)

    class Meta:
        model = models.Comment
        fields = "__all__"
