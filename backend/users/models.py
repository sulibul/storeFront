from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
from django.core.validators import RegexValidator, MinLengthValidator
from django import forms


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(verbose_name='Email',
                              max_length=256, unique=True)
    password = models.CharField(max_length=100, validators=[
        MinLengthValidator(8, 'the field must contain at least 8 characters')
    ])
    name = models.CharField(max_length=20)
    surname = models.CharField(max_length=20)
    date_of_birth = models.DateField()
    city = models.CharField(max_length=30)
    post_code = models.CharField(
        max_length=6,
        validators=[RegexValidator(
            '^[0-9]{2}-[0-9]{3}', ('Invalid postal code'))],
    )
    street = models.CharField(max_length=50)
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_super_user = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('password', 'name', 'surname',
                       'date_of_birth', 'city', 'post_code', 'street')

    objects = CustomUserManager()

    def __str__(self):
        return self.name + " " + self.surname
