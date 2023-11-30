from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from backend.features.messages.messages_serializers import (
    MessageSerializer,
    MessageSendSerializer,
)
from backend.features.user.user_serializers import UserSerializer
from backend.models import Message, Connection


class SendMessage(generics.CreateAPIView):
    serializer_class = MessageSendSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        recipient_id = int(self.request.data.get("recipient"))
        connection_first = Connection.objects.filter(
            first_user=self.request.user, second_user_id=recipient_id
        ).exists()
        connection_second = Connection.objects.filter(
            first_user=recipient_id, second_user_id=self.request.user
        ).exists()

        if not connection_first and not connection_second:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        Message.objects.create(
            sender=self.request.user,
            recipient=get_object_or_404(get_user_model(), id=recipient_id),
            content=self.request.data.get("content"),
        )

        return Response(status=status.HTTP_201_CREATED)


class ListUnseenMessages(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Message.objects.filter(recipient=self.request.user, seen=False)


class ListAllMessagesUsers(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        current_user = self.request.user

        return Message.objects.filter(sender=current_user) | Message.objects.filter(
            recipient=current_user
        )

    def get(self, request, *args, **kwargs):
        all_messages = self.get_queryset()
        all_users = set()
        for message in all_messages:
            all_users.add(message.sender)
            all_users.add(message.recipient)

        # Convert the set of users to a list
        unique_users = list(all_users)
        serializer = self.serializer_class(unique_users, many=True)
        return Response(serializer.data)


class ListAllMessages(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        current_user = self.request.user

        return Message.objects.filter(sender=current_user) | Message.objects.filter(
            recipient=current_user
        )


class MarkAllMessagesAsSeen(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        current_user = self.request.user

        Message.objects.filter(recipient=current_user, seen=False).update(seen=True)

        return Response(
            status=status.HTTP_200_OK,
        )
