from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, generics, status, permissions
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
import datetime

# from .permission import CommentOwnerPerms
from rest_framework.decorators import action
from .paginator import TuaPagination
from django.conf import settings
from django.db.models import F
from .paginator import TuaPagination
from .models import HangMuc, DiaDiem, DiemDuLich, User, BinhLuan, DanhGia, DatTour
from .permission import ChoPhepBinhLuan, DatTourChoPhep, DanhGiaChoPhep
from rest_framework.views import APIView
from .serializers import (
    HangMucSerializer,
    DiaDiemSerializer,
    DiemDuLichSerializer,
    DiemDuLichChiTietSerializer,
    NguoiDungSerializer,
    BinhLuanSerializer,
    DanhGiaSerializer,
    DatTourSerializer
)


class HangMucViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = HangMuc.objects.all()
    serializer_class = HangMucSerializer

    def get_queryset(self):
        hm = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            hm = hm.filter(ten__icontains=kw)

        return hm

class DiaDiemViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    serializer_class = DiaDiemSerializer
    permission_classes = [permissions.AllowAny]
    queryset = DiaDiem.objects.filter(hoat_dong=True)
    pagination_class = TuaPagination

    def get_queryset(self):
        diadiems = DiaDiem.objects.filter(hoat_dong=True)

        dd = self.request.query_params.get('dd')
        if dd is not None:
            diadiems = diadiems.filter(ten__icontains=dd)

        hm_id = self.request.query_params.get('hang_muc_id')
        if hm_id is not None:
            diadiems = diadiems.filter(hang_muc_id=hm_id)
        return diadiems
#note sua q
    @action(methods=['get'], detail=True, url_path="diemdulichs")
    def get_diemdulichs(self, request, pk):
        diemdulichs = DiaDiem.objects.get(pk=pk).diemdulichs.filter(hoat_dong=True)
        # tour = self.get_object()
        # diemdulichs = tour.diemdulichs.filter(hoat_dong=True)
#note sua q
        ddl = request.query_params.get('ddl')
        if ddl is not None:
            diemdulichs = diemdulichs.filter(ten__icontains=ddl)

        return Response(data=DiemDuLichSerializer(diemdulichs, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class DiemDulichViewSet(viewsets.ViewSet, generics.UpdateAPIView, generics.RetrieveAPIView, generics.ListAPIView, generics.DestroyAPIView):
    serializer_class = DiemDuLichChiTietSerializer
    queryset = DiemDuLich.objects.filter(hoat_dong=True)

    def get_permissions(self):
        if self.action == 'thembinhluans':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['get'], url_path="binhluan", detail=True)
    def get_binhluans(self, request, pk):
        diem_du_lich = self.get_object()
        binhluan = diem_du_lich.binhluan.filter(hoat_dong=True)
        # bluan = BinhLuan.objects.get(pk=pk).bluan.filter(hoat_dong=True)
        # return Response(BinhLuanSerializer(bluan, many=True).data,
        #                 status=status.HTTP_200_OK)
        return Response(BinhLuanSerializer(binhluan, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path="thembinhluans")
    def them_binhluans(self, request, pk):
        noi_dung = request.data.get('noi_dung')
        if noi_dung:
            bl = BinhLuan.objects.create(noi_dung=noi_dung, diemdl=self.get_object(), nguoi_dung=request.user)

            return Response(BinhLuanSerializer(bl).data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], url_path='dgia', detail=True)
    def get_danhgia(self, request, pk):
        # diem_du_lich = self.get_object()
        # bluan = diem_du_lich.bluan.filter(hoat_dong=True)
        dgia = DanhGia.objects.get(pk=pk).dgia.filter(hoat_dong=True)
        # return Response(BinhLuanSerializer(bluan, many=True).data,
        #                 status=status.HTTP_200_OK)
        return Response(data=DanhGiaSerializer(dgia, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='danhgia')
    def danh_gia_tour(self, request, pk):
        try:
            danhgia = int(request.data['danh_gia'])
        except IndexError | ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            dgia = DanhGia.objects.create(danh_gia=danhgia, nguoi_dung=request.user, diemdl=self.get_object())

            return Response(DanhGiaSerializer(dgia).data, status=status.HTTP_200_OK)


class BinhLuanViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView, generics.ListAPIView, generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = BinhLuan.objects.filter(hoat_dong=True)
    serializer_class = BinhLuanSerializer

    def get_permissions(self):
        if self.action in ['update', 'destroy', 'list']:
            return [ChoPhepBinhLuan()]

        return[permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        if request.user == self.get_object().nguoi_dung:
            return super().destroy(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user == self.get_object().nguoi_dung:
            return super().partial_update(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)


class DanhGiaViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = DanhGia.objects
    serializer_class = DanhGiaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['update', 'destroy', 'list']:
            return [DanhGiaChoPhep()]

        return[permissions.IsAuthenticated()]

    def destroy(self, request, *args, **kwargs):
        if request.user == self.get_object().nguoi_dung:
            return super().destroy(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user == self.get_object().nguoi_dung:
            return super().partial_update(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)


class NguoiDungViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = NguoiDungSerializer

    def get_permissions(self):
        if self.action == 'lay-nguoidung':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path="lay-nguoidung")
    def lay_nguoidung(self, request):
        return Response(self.serializer_class(request.user, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class AuthenticationInfomation(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)


class DatTourViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset =DatTour.objects.all()
    serializer_class =DatTourSerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.IsAuthenticated()]
        return [DatTourChoPhep()]


    def crete(self, request):
        khach_hang =User.objects.get(pk =request.data.get('khach_hang'))
        tour = DiaDiem.objects.get(pk=request.data.get('tour'))
        so_luong = request.data.get('so luong')

    # book = DatTour.objects.create(khach_hang = khach_hang, so_luong = so_luong, tour = tour)
    #
    # return Response(DatTourSerializer(book).data, status=status.HTTP_200_OK)