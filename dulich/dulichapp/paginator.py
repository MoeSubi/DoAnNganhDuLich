from rest_framework.pagination import PageNumberPagination


class TuaPagination(PageNumberPagination):
    page_size = 6
