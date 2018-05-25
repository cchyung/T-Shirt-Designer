# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from django.template.defaultfilters import slugify
import uuid, re


# Create your models here.
class Style(models.Model):
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False, primary_key=True)
    style_id = models.IntegerField()
    brand = models.CharField(max_length=100, default='Default Brand')
    name = models.CharField(max_length=100, default='Default Style')
    description = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return self.style_id.__str__() + ": " + self.name


# Possible colors for a specific style
class StyleColor(models.Model):
    styles = models.ManyToManyField(Style)
    color = models.CharField(max_length=40, default='Default Color')
    hex = models.CharField(max_length=6, default='FFFFFF')

    def __str__(self):
        return self.color


# Pricing based on quantity brackets
class StylePrice(models.Model):
    style = models.ForeignKey(Style, on_delete=models.CASCADE)
    price1 = models.DecimalField(max_digits=6, decimal_places=2)
    price2 = models.DecimalField(max_digits=6, decimal_places=2)
    price3 = models.DecimalField(max_digits=6, decimal_places=2)
    price4 = models.DecimalField(max_digits=6, decimal_places=2)
    price5 = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.style.__str__() + " prices"


# For ink color selections
class InkColor(models.Model):
    color = models.CharField(max_length=40, default='Default Color')
    hex = models.CharField(max_length=6, default='FFFFFF')

    def __str__(self):
        return self.color
