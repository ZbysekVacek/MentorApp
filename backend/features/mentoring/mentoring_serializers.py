from rest_framework import serializers

from backend.features.user.user_serializers import UserSerializer
from backend.models import Mentoring


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
