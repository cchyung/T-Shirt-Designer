from rest_framework import serializers
import models
from django.core import exceptions


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Style
        fields = (
            'uuid',
            'style_id',
            'name',
            'brand',
            'description'
        )


class StyleColorSerializer(serializers.ModelSerializer):
    # style = StyleSerializer()

    class Meta:
        model = models.StyleColor
        fields = (
            'color',
            'slug',
            'hex',
        )


class InkColorSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.InkColor
        fields = (
            'color',
            'hex'
        )


class StyleImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.StyleImage
        fields = (
            'front',
            'back',
        )
