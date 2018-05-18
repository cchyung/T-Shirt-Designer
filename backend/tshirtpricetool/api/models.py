# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


# Create your models here.
class Shirt(models.Model):
    brand = models.CharField(max_length=100, default='Default Brand')
    style = models.CharField(max_length=100, default='Default Style')
    description = models.CharField(max_length=300, blank=True)


class ShirtColor(models.Model):
    shirt = models.ForeignKey(Shirt, on_delete=models.CASCADE)
    color = models.CharField(max_length=40, default='Default Color')

    def __str__(self):
        return self.shirt.brand + " " + self.shirt.style + " " + self.color


