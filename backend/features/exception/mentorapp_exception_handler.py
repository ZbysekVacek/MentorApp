from rest_framework.response import Response
from rest_framework.views import exception_handler


def mentorapp_exception_handler(exc, context):
    """Custom exception handler for MentorApp"""
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Now add the HTTP status code to the response.
    if response is not None:
        response.data["status_code"] = response.status_code
        return response

    response_data = {"status_code": 500, "detail": "Server error"}
    response = Response(response_data, 500)

    return response
