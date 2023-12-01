from rest_framework import serializers

from backend.features.user.user_serializers import UserSerializer
from backend.models import Mentoring, MentoringRequest


class MentoringSerializer(serializers.ModelSerializer):
    mentor = UserSerializer()
    mentee = UserSerializer()

    class Meta:
        model = Mentoring
        fields = [
            "id",
            "connection",
            "settings",
            "created_at",
            "frequency_days",
            "objectives",
            "mentor",
            "mentee",
            "active",
        ]


class MentoringRequestSerializer(serializers.ModelSerializer):
    from_user = UserSerializer()
    to_user = UserSerializer()

    class Meta:
        model = MentoringRequest
        fields = ["id", "from_user", "to_user", "created_at", "text"]


class MentoringRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentoringRequest
        fields = ["text"]
