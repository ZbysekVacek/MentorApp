from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from backend.features.app_settings.app_settings_serializers import AppSettingsSerializer
from backend.models import AppSettings


class AppSettingsList(generics.ListAPIView):
    """Views for app_settings"""

    serializer_class = AppSettingsSerializer
    permission_classes = [IsAuthenticated]
    queryset = AppSettings.objects.all()
