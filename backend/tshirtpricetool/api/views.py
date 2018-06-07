from __future__ import unicode_literals
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.

# -*- coding: utf-8 -*-

from rest_framework import status, viewsets, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
import models
import serializers


class StyleViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.StyleSerializer
    lookup_field = 'uuid'
    queryset = models.Style.objects.all()


class StyleColorViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.StyleColorSerializer
    lookup_field = 'slug'
    queryset = models.StyleColor.objects.all()

    def get_queryset(self):
        style_uuid = self.kwargs['style_uuid']
        style = models.Style.objects.get(uuid=style_uuid)
        return style.stylecolor_set.all()


class InkColorListView(generics.ListAPIView):
    serializer_class = serializers.InkColorSerializer
    queryset = models.InkColor.objects.all()


class StyleImageDetail(generics.RetrieveAPIView):
    serializer_class = serializers.StyleImageSerializer
    queryset = models.StyleImage.objects.all()

    # get object based on style and color
    def get_object(self):
        queryset = self.get_queryset()
        uuid = self.kwargs['style_uuid']
        color_slug = self.kwargs['color']
        style = models.Style.objects.filter(uuid=uuid)
        color = models.StyleColor.objects.filter(slug=color_slug)

        print style
        print color
        
        obj = get_object_or_404(queryset, style=style, color=color)
        return obj
