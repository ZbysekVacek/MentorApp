from rest_framework import serializers

from backend.features.user.user_serializers import UserSerializer
from backend.models import MentoringRequest


class RequestForMentoringSerializer(serializers.ModelSerializer):
    """
    Serializer for the MentoringRequest model.
    Cannot use MentoringRequestSerializer because it for some reason generates duplicate name in openapi schema.
    """

    from_user = UserSerializer()
    to_user = UserSerializer()

    class Meta:
        model = MentoringRequest
        fields = ["id", "from_user", "to_user", "created_at", "text"]
        read_only_fields = ["id", "from_user", "to_user", "created_at"]


class CreateRequestSerializer(serializers.ModelSerializer):
    """Serializer for creating a MentoringRequest"""

    class Meta:
        model = MentoringRequest
        fields = ["text"]
