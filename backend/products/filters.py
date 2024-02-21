import django_filters
from products.models import Product
from .models import Category, Company
from django.db.models import Q


class ProductFilter(django_filters.FilterSet):
    price = django_filters.RangeFilter()
    category = django_filters.ModelMultipleChoiceFilter(
        field_name='category',
        queryset=Category.objects.all(),
        # method='filterAll',
        conjoined=True)
    company = django_filters.ModelMultipleChoiceFilter(
        field_name='company',
        method='filterAll',
        queryset=Company.objects.all(),
        conjoined=True)

    def filterAll(self, queryset, name, value):
        if not value or not name:
            return queryset
        query = Q()
        # add every value to a filter rule
        for criterium in value:
            query = query | Q(company_id__exact=criterium)
        return Product.objects.filter(query)

    class Meta:
        model = Product
        fields = {'name': ['icontains'], }
