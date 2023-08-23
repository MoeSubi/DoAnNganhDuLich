from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from .models import HangMuc, User, DiaDiem, DiemDuLich, BinhLuan, DanhGia, DatTour

from datetime import datetime
from rest_framework import serializers

class NguoiDungSerializer(ModelSerializer):

    def create(self, validated_data):
        data = validated_data.copy()
        user = User(**data)
        user.la_khach_hang = True
        user.is_active = True
        user.set_password(user.password)
        user.save()

        return user

    anhdaidien = serializers.SerializerMethodField(source='anhdaidien')

    def get_anhdaidien(self, obj):
        request = self.context['request']
        if obj.anhdaidien and not obj.anhdaidien.name.startswith("/static"):
            path = '/static/%s' % obj.anhdaidien.name
            print(request, path)
            return request.build_absolute_uri(path)
    class Meta:
        model = User
        fields = ['anhdaidien', 'la_khach_hang', 'username','password','first_name', 'last_name', 'sdt', 'cmnd',
                  'ngay_sinh', 'dia_chi', 'email', 'gioi_tinh']
        extra_kwargs = {
            'password': {'write_only': 'true'},
            'anhdaidien': {
                'read_only': True
            },
        }




class HangMucSerializer(ModelSerializer):
    class Meta:
        model = HangMuc
        fields = ['id', 'ten']


class DiaDiemSerializer(ModelSerializer):
    hinh_anh = SerializerMethodField(source='hinh_anh')
    ngay_tao = serializers.DateTimeField(format="%d-%m-%Y")
    def get_hinh_anh(self, diadiem):
        request = self.context['request']
        p = '/static/%s' % diadiem.hinh_anh.name
#name la cua ImageFieldFile
        return request.build_absolute_uri(p)

    class Meta:
        model = DiaDiem
        fields = ["id", "ten", "hinh_anh", "ngay_khoi_hanh", "chuyen_di", "phuong_tien", "hang_muc","ngay_tao"]


class DiemDuLichSerializer(ModelSerializer):
    ngay_tao = serializers.DateTimeField(format="%d-%m-%Y")
    hinh_anh_ddl = serializers.SerializerMethodField(source='hinh_anh_ddl')

    def get_hinh_anh_ddl(self, obj):
        request = self.context['request']
        if obj.hinh_anh_ddl and not obj.hinh_anh_ddl.name.startswith("/static"):
            path = '/static/%s' % obj.hinh_anh_ddl.name
            print(request, path)
            return request.build_absolute_uri(path)

    class Meta:
        model = DiemDuLich
        fields = ["id", "ten", "hinh_anh_ddl", "tour","ngay_tao","noi_dung"]


class DiemDuLichChiTietSerializer(DiemDuLichSerializer):
    class Meta:
        model = DiemDuLichSerializer.Meta.model
        fields = DiemDuLichSerializer.Meta.fields + ['noi_dung']


class BinhLuanSerializer(ModelSerializer):
    nguoi_dung = NguoiDungSerializer()
    diemdl = DiemDuLichSerializer()
    class Meta:
        model = BinhLuan
        exclude = ['hoat_dong']



class TaoBinhLuanSerializer(ModelSerializer):
    ngay_tao = serializers.DateTimeField(format="%d-%m-%Y")

    class Meta:
        model = BinhLuan
        fields = ["id", "noi_dung", "nguoi_dung", "diemdl", "ngay_tao"]


class DanhGiaSerializer(ModelSerializer):
    ngay_tao = serializers.DateTimeField(format="%d-%m-%Y")
    class Meta:
        model = DanhGia
        fields = "__all__"


class DatTourSerializer(ModelSerializer):
    class Meta:
        model = DatTour
        fields = "__all__"