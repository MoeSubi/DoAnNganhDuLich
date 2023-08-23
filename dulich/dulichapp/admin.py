from django.contrib import admin
from django.utils.safestring import mark_safe
from django import forms
from .models import HangMuc, DiaDiem, DiemDuLich
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.urls import path
from django.db.models import Count

admin.site.register(HangMuc)
admin.site.register(DiaDiem)
admin.site.register(DiemDuLich)
