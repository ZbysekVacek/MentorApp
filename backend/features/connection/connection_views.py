from rest_framework import generics, permissions, status
from rest_framework.response import Response

from backend.features.connection.connection_serializers import (
    ConnectionListItemSerializer,
    ConnectionRequestSerializer,
    ConnectionSerializer,
)
from backend.models import Connection, ConnectionRequest


class ConnectionListDetail(generics.ListAPIView):
    serializer_class = ConnectionListItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Connection.objects.filter(first_user=user) | Connection.objects.filter(
            second_user=user
        )


class ConnectionDelete(generics.DestroyAPIView):
    serializer_class = ConnectionListItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # This will forbid the user to delete the connection if he is not in it
        return Connection.objects.filter(first_user=user) | Connection.objects.filter(
            second_user=user
        )


class ConnectionRequestListCreate(generics.ListCreateAPIView):
    serializer_class = ConnectionRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ConnectionRequest.objects.filter(
            from_user=user
        ) | ConnectionRequest.objects.filter(to_user=user)

    def post(self, request, *args, **kwargs):
        serializer = ConnectionRequestSerializer(data=request.data)

        # Validate serializer data
        if serializer.is_valid():
            from_user = serializer.validated_data["from_user"]
            to_user = serializer.validated_data["to_user"]

            if from_user != self.request.user:
                return Response(
                    "You can't create a connection request for another user.",
                    status=status.HTTP_400_BAD_REQUEST,
                )

            existing_request_from = ConnectionRequest.objects.filter(
                from_user=from_user, to_user=to_user
            ).exists()

            existing_request_to = ConnectionRequest.objects.filter(
                from_user=to_user, to_user=from_user
            ).exists()

            if existing_request_from or existing_request_to:
                return Response(
                    "Connection request already exists.",
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Create the connection request
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConnectionRequestDelete(generics.DestroyAPIView):
    serializer_class = ConnectionRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # This will forbid the user to delete the connection if he is not in it
        return ConnectionRequest.objects.filter(
            from_user=user
        ) | ConnectionRequest.objects.filter(to_user=user)


class ConnectionRequestAccept(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ConnectionRequest.objects.filter(to_user=user)

    def post(self, request, *args, **kwargs):
        connection_request_id = kwargs.get("pk")

        if connection_request_id is not None:
            try:
                connection_request = self.get_queryset().get(id=connection_request_id)
            except ConnectionRequest.DoesNotExist:
                return Response(
                    "Connection request not found.",
                    status=status.HTTP_404_NOT_FOUND,
                )

            connection = Connection.objects.create(
                first_user=connection_request.from_user,
                second_user=connection_request.to_user,
            )
            connection_request.delete()

            connection_serializer = ConnectionSerializer(connection)

            return Response(
                connection_serializer.data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            "Connection request ID is required.",
            status=status.HTTP_400_BAD_REQUEST,
        )
