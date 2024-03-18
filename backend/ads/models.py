from django.db import models


class Ad(models.Model):
    """Advertisment model"""
    name = models.CharField(max_length=100)
    img_url = models.URLField()
    ad_url = models.URLField()

    def __str__(self):
        return self.name
