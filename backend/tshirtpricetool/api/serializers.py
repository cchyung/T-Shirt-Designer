from rest_framework import serializers
import models


class StyleColorSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.StyleColor
        fields = (
            'color',
            'slug',
            'hex'
        )


class StyleSerializer(serializers.ModelSerializer):
    colors = StyleColorSerializer(many=True, read_only=True)

    class Meta:
        model = models.Style
        fields = (
            'uuid',
            'style_id',
            'name',
            'brand',
            'description',
            'colors'
        )


class StyleImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.StyleImage
        fields = (
            'front',
            'back',
        )


class AddonSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Addon
        fields = (
            'id',
            'name'
        )
