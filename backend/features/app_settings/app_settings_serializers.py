from rest_framework import serializers

from backend.models import AppSettings


class AppSettingsSerializer(serializers.ModelSerializer):
    """Serializer for AppSettings model"""

    class Meta:
        model = AppSettings
        fields = "__all__"
