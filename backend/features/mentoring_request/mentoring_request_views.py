from django.contrib.auth import get_user_model
from django.utils.timezone import now
from rest_framework import status
from rest_framework.response import Response

from backend.features.mentoring_request.mentoring_request_serializers import (
    RequestForMentoringSerializer,
    CreateRequestSerializer,
)
from backend.models import (
    MentoringRequest,
    Mentoring,
    Notification,
    Connection,
)

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class CreateMentoringRequest(generics.CreateAPIView):
    """View for creating a mentoring request"""

    permission_classes = [IsAuthenticated]
    queryset = MentoringRequest.objects.all()
    serializer_class = CreateRequestSerializer

    def create(self, request, *args, **kwargs):
        to_user_id = self.kwargs.get("to_user_id")
        current_user = self.request.user

        # Check if there is already a mentoring request
        existing_request_from = MentoringRequest.objects.filter(
            from_user=current_user, to_user=to_user_id
        ).exists()
        existing_request_to = MentoringRequest.objects.filter(
            from_user=to_user_id, to_user=current_user
        ).exists()
        if existing_request_from or existing_request_to:
            return Response(
                {"detail": "Mentoring request already exists for these users."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if there is already a mentoring
        existing_mentoring_mentor = Mentoring.objects.filter(
            mentor=current_user,
            mentee=to_user_id,
            active=True,
        ).exists()
        existing_mentoring_mentee = Mentoring.objects.filter(
            mentor=to_user_id,
            mentee=current_user,
            active=True,
        ).exists()
        if existing_mentoring_mentor or existing_mentoring_mentee:
            return Response(
                {"detail": "Mentoring already exists for these user."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create a mentoring request
        text_for_request = request.data.get("text", "")
        to_user = get_user_model().objects.get(id=to_user_id)
        created_request = MentoringRequest(
            from_user=current_user, to_user=to_user, text="text_for_request"
        )
        created_request.save()

        # Create a notification for the to user
        notification_content = (
            f"You have a new mentoring request from {to_user.username}."
        )
        notification = Notification(
            user=to_user,
            title="New mentoring request",
            content=notification_content,
            followup=Notification.NotificationFollowUp.MENTORING_REQUESTS_PAGE,
            seen=False,
            created_at=now(),
            source="MENTORING_REQUEST",
        )
        notification.save()

        return Response(
            status=status.HTTP_201_CREATED,
        )


class MentoringRequestsFromUser(generics.ListAPIView):
    """View for listing mentoring requests from the user"""

    serializer_class = RequestForMentoringSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        current_user = self.request.user
        return MentoringRequest.objects.filter(from_user=current_user)


class MentoringRequestsToUser(generics.ListAPIView):
    serializer_class = RequestForMentoringSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        current_user = self.request.user
        return MentoringRequest.objects.filter(to_user=current_user)


class AcceptMentoringRequest(generics.DestroyAPIView):
    """View for accepting a mentoring request"""

    permission_classes = [IsAuthenticated]
    serializer_class = RequestForMentoringSerializer

    def destroy(self, request, *args, **kwargs):
        mentoring_request_id = self.kwargs.get("mentoring_request_id")
        current_user = self.request.user

        # Validate if the currently logged user is in to_user field of the request
        mentoring_request = MentoringRequest.objects.get(id=mentoring_request_id)
        if mentoring_request.to_user != current_user:
            return Response(
                {
                    "detail": "You do not have permission to accept this mentoring request."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Check if there is a connection object between users
        connection_exists_first = Connection.objects.filter(
            first_user=current_user, second_user=mentoring_request.from_user
        ).exists()
        connection_exists_second = Connection.objects.filter(
            first_user=mentoring_request.from_user, second_user=current_user
        ).exists()

        # If no connection exists, create the connection object
        if not connection_exists_first and not connection_exists_second:
            connection = Connection(
                first_user=mentoring_request.from_user, second_user=current_user
            )
            connection.save()

        else:
            if connection_exists_first:
                connection = Connection.objects.get(
                    first_user=current_user, second_user=mentoring_request.from_user
                )
            else:
                connection = Connection.objects.get(
                    first_user=mentoring_request.from_user, second_user=current_user
                )

        # Create a new Mentoring object
        mentoring = Mentoring(
            connection=connection,
            settings="",
            frequency_days=14,  # Recommended default based on discussion with real mentor
            objectives="",
            mentor=current_user,
            mentee=mentoring_request.from_user,
            active=True,
        )
        mentoring.save()

        mentoring_request.delete()

        # Create a notification for both users
        notification_mentor = Notification(
            user=current_user,
            title="Mentoring Request Accepted",
            content=f"You have accepted a mentoring request from {mentoring_request.from_user.username}.",
            followup=Notification.NotificationFollowUp.MENTORINGS_PAGE,
            created_at=now(),
            seen=False,
        )
        notification_mentor.save()

        notification_mentee = Notification(
            user=mentoring_request.from_user,
            title="Mentoring Request Accepted",
            content=f"{current_user.username} has accepted your mentoring request.",
            followup=Notification.NotificationFollowUp.MENTORINGS_PAGE,
            created_at=now(),
            seen=False,
        )
        notification_mentee.save()

        return Response(
            {"detail": "Mentoring request accepted successfully."},
            status=status.HTTP_200_OK,
        )


class DeleteMentoringRequest(generics.DestroyAPIView):
    """View for deleting a mentoring request"""

    serializer_class = RequestForMentoringSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return MentoringRequest.objects.filter(
            from_user=self.request.user
        ) | MentoringRequest.objects.filter(to_user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        mentoring_request_id = self.kwargs.get("pk")
        current_user = self.request.user

        # Validate if the currently logged user is in from_user or to_user field of the request
        mentoring_request = self.get_queryset().get(id=int(mentoring_request_id))
        if (
            current_user != mentoring_request.from_user
            and current_user != mentoring_request.to_user
        ):
            return Response(
                {
                    "detail": "You do not have permission to delete this mentoring request."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        mentoring_request.delete()

        return Response(
            {"detail": "Mentoring request deleted successfully."},
            status=status.HTTP_200_OK,
        )
