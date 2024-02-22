from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
from django.core.validators import RegexValidator


class CustomUser(AbstractUser):
    email = models.EmailField(verbose_name='Email',
                              max_length=256, unique=True)
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
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username', 'name', 'password', 'surname',
                       'date_of_birth', 'city', 'post_code', 'street')

    objects = CustomUserManager()

    def __str__(self):
        return '{self.name} {self.surname}'
