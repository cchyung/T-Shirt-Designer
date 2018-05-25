from __future__ import unicode_literals
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.

# -*- coding: utf-8 -*-

from rest_framework import status, viewsets, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
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