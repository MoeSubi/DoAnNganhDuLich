from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('hangmucs', views.HangMucViewSet, 'hangmuc')
router.register('diadiems', views.DiaDiemViewSet, 'diadiem')
router.register('diemdulichs', views.DiemDulichViewSet, 'diemdulich')
router.register('nguoidungs', views.NguoiDungViewSet,'nguoidung')
router.register('binhluans', views.BinhLuanViewSet,'binhluan')

urlpatterns = [
    path('', include(router.urls)),
    path('oauth2-info/', views.AuthenticationInfomation.as_view())
]