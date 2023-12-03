from drf_spectacular.utils import OpenApiResponse
from rest_framework import status

from backend.features.exception.exception_serializer import ExceptionSerializer

"""Reusable exceptions for endpoints"""

validation_exception = {
    status.HTTP_400_BAD_REQUEST: OpenApiResponse(
        {"type": "object", "additionalProperties": {"type": "string"}},
        "Validation error",
    )
}
generic_exception = {
    "default": OpenApiResponse(ExceptionSerializer, "Generic server error"),
}

forbidden_exception = {
    status.HTTP_403_FORBIDDEN: OpenApiResponse(
        ExceptionSerializer, "User is not logged in"
    )
}

default_restricted_endpoint_exceptions = {**forbidden_exception, **generic_exception}
