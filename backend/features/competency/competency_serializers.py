from rest_framework import serializers

from backend.models import Competency


class CompetencySerializer(serializers.ModelSerializer):
    """Serializer for Competency model"""

    class Meta:
        model = Competency
        fields = "__all__"
