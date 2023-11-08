from drf_spectacular.utils import OpenApiResponse, extend_schema
from rest_framework import generics, permissions, status

from .features.exception.exception_serializer import ExceptionSerializer
from .features.exception.reusable_exceptions import (
    forbidden_exception,
    default_restricted_endpoint_exceptions,
    validation_exception,
)
from .serializers import *


class MeetingsList(generics.ListCreateAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    permission_classes = [permissions.IsAuthenticated]


class MeetingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    permission_classes = [permissions.IsAuthenticated]
