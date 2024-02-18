import django_filters
from products.models import Product


class ProductFilter(django_filters.FilterSet):
    price = django_filters.RangeFilter()

    class Meta:
        model = Product
        fields = {'name': ['icontains'], 'company': ['exact'],
                  'category': ['exact']}
