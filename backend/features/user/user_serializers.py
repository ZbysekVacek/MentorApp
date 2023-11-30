from django.contrib.auth import get_user_model
from rest_framework import serializers

from backend.models import Profile

"""
User and Profile related serializers.
User and Profile models are so interconnected that it makes sense to have them in the same package and files.
"""


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            "accepts_mentees",
            "about",
            "contact",
            "skills",
            "id",
            "user",
            "avatar",
            "competencies",
        )


class ProfileAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("avatar",)


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False, read_only=True)

    class Meta:
        model = get_user_model()

        fields = (
            "username",
            "email",
            "id",
            "groups",
            "user_permissions",
            "first_name",
            "last_name",
            "is_staff",
            "profile",
        )


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("username", "password", "email", "first_name", "last_name")
        extra_kwargs = {"password": {"write_only": True}}


class LoginRequestSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
