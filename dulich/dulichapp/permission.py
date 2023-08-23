from rest_framework import permissions


class ChoPhepBinhLuan(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, comment):
        return request.user == comment.user


class DatTourChoPhep(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.user


class DanhGiaChoPhep(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, danhgia):
        return request.user == danhgia.user