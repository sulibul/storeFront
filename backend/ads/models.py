from django.db import models

# Create your models here.


class Ad(models.Model):
    """Class representing a ad"""
    name = models.CharField(max_length=100)
    img_url = models.URLField()
    ad_url = models.URLField()

    def __str__(self):
        return self.name
