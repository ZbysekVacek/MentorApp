from rest_framework import generics, permissions

from backend.features.connection.connection_serializers import ConnectionSerializer
from backend.models import Connection


class ConnectionListDetail(generics.ListCreateAPIView):
    serializer_class = ConnectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Connection.objects.filter(first_user=user) | Connection.objects.filter(
            second_user=user
        )
