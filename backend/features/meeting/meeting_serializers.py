from rest_framework import serializers

from backend.features.user.user_serializers import UserSerializer
from backend.models import Meeting


class MeetingSerializer(serializers.ModelSerializer):
    """Serializer for Meeting model"""

    author = UserSerializer()
    registered_mentee = UserSerializer()

    class Meta:
        model = Meeting
        fields = "__all__"


class MeetingCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating a Meeting"""

    class Meta:
        model = Meeting
        fields = [
            "meeting_date",
            "description",
            "location",
            "registered_mentee",
            "title",
        ]
