from ckeditor.fields import RichTextField
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    anhdaidien = models.ImageField(null=True, upload_to='users')
    la_khach_hang = models.BooleanField(default=False)
    sdt = models.CharField(max_length=10, unique=True, null=True)
    cmnd = models.CharField(blank=False, max_length=12, unique=True, null=True)

    gioitinh_chon = ((0, "Nam"), (1, "Nữ"))
    ngay_sinh = models.DateField(null=True)
    dia_chi = models.CharField(null=True, max_length=100)
    email = models.EmailField(max_length=255, unique=True, null=True)
    gioi_tinh = models.IntegerField(choices=gioitinh_chon, default=0)

    class Meta:
        ordering = ["id"]


class MyBase(models.Model):
    ten = models.CharField(max_length=100)
    hoat_dong = models.BooleanField(default=True)
    # ngay_tao = models.DateTimeField(auto_now_add=True)
    ngay_tao = models.DateTimeField(auto_now_add=True, auto_now=False)
    # ngay_cap_nhat = models.DateTimeField(auto_now=True)
    ngay_cap_nhat = models.DateTimeField(auto_now_add=False, auto_now=True)

    class Meta:
        abstract = True


class HangMuc(models.Model):
    ten = models.CharField(max_length=60, null=False, unique=True)

    def __str__(self):
        return self.ten


class DiaDiem(MyBase):
    class Meta:
        unique_together = ['ten', 'hang_muc']
        ordering = ["id"]

    gia = models.CharField(max_length=30, blank=False)
    hinh_anh = models.ImageField(upload_to='diadiem', null=True)
    ngay_khoi_hanh = models.CharField(max_length=100)
    chuyen_di = models.CharField(max_length=150)
    phuong_tien = models.CharField(max_length=100)
    mieu_ta = models.TextField(null=True, blank=True)
    hang_muc = models.ForeignKey(HangMuc, on_delete=models.SET_NULL, null=True)
    nguoi_dung = models.ManyToManyField(User)
    def __str__(self):
        return self.ten


class DiemDuLich(MyBase):
    class Meta:
        unique_together = ('ten', 'tour')

    hinh_anh_ddl = models.ImageField(null=True, upload_to='diemdulich')
    noi_dung = models.TextField(blank=True, null=True)
    tour = models.ForeignKey(DiaDiem, related_name="diemdulichs", on_delete=models.CASCADE)

    def __str__(self):
        return self.ten


class BinhLuan(models.Model):
    noi_dung = models.TextField()
    nguoi_dung = models.ForeignKey(User, on_delete=models.CASCADE)
    diemdl = models.ForeignKey(DiemDuLich, related_name='thembinhluans', on_delete=models.CASCADE)
    ngay_tao = models.DateTimeField(auto_now_add=True, auto_now=False)
    ngay_cap_nhat = models.DateTimeField(auto_now_add=False, auto_now=True)
    hoat_dong = models.BooleanField(default=True)

    def __str__(self):
        return self.noi_dung


class DanhGia(models.Model):
    danh_gia = models.PositiveSmallIntegerField(default=0)
    ngay_tao = models.DateTimeField(auto_now_add=True, auto_now=False)
    ngay_cap_nhat = models.DateTimeField(auto_now_add=False, auto_now=True)
    nguoi_dung = models.ForeignKey(User, on_delete=models.CASCADE)
    diemdl = models.ForeignKey(DiemDuLich, on_delete=models.CASCADE)


class DatTour(models.Model):
    tour =models.ForeignKey(DiaDiem, on_delete=models.CASCADE)
    khach_hang = models.ForeignKey(User, on_delete=models.CASCADE)
    so_luong =models.IntegerField(default=0)
    hoa_don_mail = models.BooleanField(default=True)


    def __str__(self):
        return "{} và {}".format(self.khach_hang, self.tour)

    class Meta:
        unique_together =('tour', 'khach_hang')


class HoaDon(models.Model):
    dat_tour = models.OneToOneField('DatTour', on_delete=models.CASCADE)
    tong_tien = models.DecimalField(default=0, blank=False, max_digits=5, decimal_places=2)
    thanh_toan_chon = ((0, "Tại quầy lấy vé"), (1, "ViettelPay"), (2, "Momo"), (3, "ZaloPay"))
    thanh_toan = models.IntegerField(choices=thanh_toan_chon, default=0)

    def __str__(self):
        return self.dat_tour