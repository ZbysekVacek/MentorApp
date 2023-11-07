from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "id",
            "groups",
            "user_permissions",
            "first_name",
            "last_name",
        )
