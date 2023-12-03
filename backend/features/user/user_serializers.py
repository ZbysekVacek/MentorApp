from django.contrib.auth import get_user_model
from rest_framework import serializers

from backend.models import Profile

"""
User and Profile related serializers.
User and Profile models are so interconnected that it makes sense to have them in the same package and files.
"""


class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for Profile model"""

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
    """Serializer for Avatar field of Profile model"""

    class Meta:
        model = Profile
        fields = ("avatar",)


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model. Profile is serialized with ProfileSerializer"""

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
    """Serializer for registering a new user"""

    class Meta:
        model = get_user_model()
        fields = ("username", "password", "email", "first_name", "last_name")
        extra_kwargs = {"password": {"write_only": True}}


class LoginRequestSerializer(serializers.Serializer):
    """Serializer for logging in a user"""

    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
