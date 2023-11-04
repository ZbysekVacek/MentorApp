from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Meeting


class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ("pk", "subject", "location", "dateTime", "mentorEmail", "menteeEmail")


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
