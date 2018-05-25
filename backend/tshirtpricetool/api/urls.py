from django.conf.urls import url, include
from rest_framework import routers
import views

router = routers.DefaultRouter()

router.register(r'^styles', views.StyleViewSet)
router.register(r'^styles/(?P<style_uuid>[\w-]+)/colors', views.StyleColorViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^inks/$', views.InkColorListView.as_view)
]