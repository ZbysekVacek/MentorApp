from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework import generics, permissions, status

from backend.features.exception.reusable_exceptions import (
    default_restricted_endpoint_exceptions,
)
from backend.features.notification.notification_serializers import (
    NotificationSerializer,
)
from rest_framework.response import Response
from backend.models import Notification


@extend_schema(
    operation_id="notifications_get_all",
)
class GetAllNotifications(generics.ListAPIView):
    """
    Lists all notifications for the current user
    """

    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "user_id"

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(user=user)


@extend_schema(
    operation_id="notifications_get_unseen",
)
class GetUnseenNotifications(generics.ListAPIView):
    """
    Lists all NOT SEEN notifications for the current user
    """

    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "user_id"

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(user=user, seen=False)


@extend_schema(
    operation_id="notifications_mark_as_seen",
    responses={
        **default_restricted_endpoint_exceptions,
        200: OpenApiResponse(None, "Notifications were marked as seen"),
    },
)
class MarkNotificationsAsSeenView(generics.RetrieveAPIView):
    """Marks all unseen notifications as seen for logged in user"""

    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(user=user, seen=False)

    def get(self, request, *args, **kwargs):
        self.get_queryset().update(seen=True)
        return Response(None, status=status.HTTP_200_OK)
