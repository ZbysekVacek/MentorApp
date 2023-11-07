from django.contrib.auth import authenticate, login, logout
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.schemas.openapi import AutoSchema

from backend.features.user.userSerializers import UserSerializer


class UserDetail(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        currentUser = self.serializer_class(request.user)
        return Response(currentUser.data)


class CustomUserLoginSchema(AutoSchema):
    def get_operation(self, path, method):
        operation = super().get_operation(path, method)
        operation["operationId"] = "userLogin"
        operation["requestBody"] = {
            "required": True,
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "username": {"type": "string"},
                            "password": {
                                "type": "string",
                                "format": "password",
                            },
                        },
                        "required": ["username", "password"],
                    }
                }
            },
        }
        operation["responses"] = {
            "200": {
                "description": "Login successful",
                "content": {
                    "application/json": {
                        "schema": {"$ref": "#/components/schemas/User"}
                    }
                },
            },
            "401": {
                "description": "Invalid credentials",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "description": {"type": "string"},
                                "code": {"type": "string"},
                            },
                        }
                    }
                },
            },
        }
        return operation


class UserLogin(APIView):
    """
    Provides user login
    """

    serializer_class = UserSerializer
    schema = CustomUserLoginSchema()

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            current_user = self.serializer_class(user)
            return Response(current_user.data)
        else:
            raise AuthenticationFailed(detail="Invalid credentials", code=None)


class UserLogout(APIView):
    """
    Logouts user from the system
    """

    def post(self, request):
        logout(request)
        return Response(None, status=status.HTTP_200_OK)
