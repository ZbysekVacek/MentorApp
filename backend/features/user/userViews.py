from django.contrib.auth import authenticate, login, logout
from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.schemas.openapi import AutoSchema

from backend.features.exception.exception_serializer import ExceptionSerializer
from backend.features.user.userSerializers import UserSerializer, LoginRequestSerializer


class UserDetail(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        currentUser = self.serializer_class(request.user)
        return Response(currentUser.data)


class UserLogin(generics.GenericAPIView):
    """
    Provides user login
    """

    serializer_class = UserSerializer

    @extend_schema(
        request=LoginRequestSerializer,
        responses={
            status.HTTP_200_OK: OpenApiResponse(UserSerializer, "User was logged in"),
            status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
                ExceptionSerializer, "Wrong credentials"
            ),
            "default": OpenApiResponse(ExceptionSerializer, "Generic server error"),
        },
    )
    def post(self, request, *args, **kwargs):
        login_serializer = LoginRequestSerializer(data=request.data)
        if login_serializer.is_valid():
            username = login_serializer.data.get("username")
            password = login_serializer.data.get("password")
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                current_user = self.serializer_class(user)
                return Response(current_user.data, status.HTTP_200_OK)
            else:
                raise AuthenticationFailed(
                    detail="Invalid credentials", code=status.HTTP_401_UNAUTHORIZED
                )
        else:
            raise AuthenticationFailed(
                detail="Invalid credentials", code=status.HTTP_401_UNAUTHORIZED
            )


class UserLogout(APIView):
    """
    Logouts user from the system
    """

    serializer_class = None

    @extend_schema(
        responses={
            status.HTTP_200_OK: OpenApiResponse(None, "User was logged out"),
            "default": OpenApiResponse(ExceptionSerializer, "Generic server error"),
        },
    )
    def post(self, request):
        logout(request)
        return Response(None, status=status.HTTP_200_OK)
