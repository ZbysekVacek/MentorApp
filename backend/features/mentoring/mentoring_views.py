from rest_framework import status
from rest_framework.response import Response

from backend.features.mentoring.mentoring_serializers import (
    MentoringSerializer,
)
from backend.models import (
    Mentoring,
    Notification,
)

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class MentoringRetrieve(generics.RetrieveAPIView):
    """View for retrieving a mentoring"""

    permission_classes = [IsAuthenticated]
    serializer_class = MentoringSerializer

    def get_queryset(self):
        return Mentoring.objects.filter(
            mentor=self.request.user
        ) | Mentoring.objects.filter(mentee=self.request.user)


class MenteesMentoringsList(generics.ListAPIView):
    """View for listing mentees mentorings"""

    serializer_class = MentoringSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        current_user = self.request.user
        return Mentoring.objects.filter(mentee=current_user)


class MentorsMentoringList(generics.ListAPIView):
    """View for listing mentors mentorings"""

    serializer_class = MentoringSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        current_user = self.request.user
        return Mentoring.objects.filter(mentor=current_user)


class MentoringEdit(generics.UpdateAPIView):
    """View for editing a mentoring"""

    serializer_class = MentoringSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Mentoring.objects.filter(mentor=self.request.user)


class DeleteMentoring(generics.DestroyAPIView):
    """View for deleting a mentoring"""

    serializer_class = MentoringSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        current_user = self.request.user
        return Mentoring.objects.filter(mentor=current_user) | Mentoring.objects.filter(
            mentee=current_user
        )

    def destroy(self, request, *args, **kwargs):
        mentoring_id = self.kwargs.get("pk")
        current_user = self.request.user

        try:
            mentoring = Mentoring.objects.get(id=int(mentoring_id))
        except Mentoring.DoesNotExist:
            return Response(
                {"detail": "Mentoring not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Create notifications before deleting the mentoring
        notification_mentor = Notification(
            user=mentoring.mentor,
            title="Mentoring Deleted",
            content=f"Your mentoring with {mentoring.mentee.username} has been deleted.",
            followup=Notification.NotificationFollowUp.NONE,
        )
        notification_mentor.save()

        notification_mentee = Notification(
            user=mentoring.mentee,
            title="Mentoring Deleted",
            content=f"Your mentoring with {mentoring.mentor.username} has been deleted.",
            followup=Notification.NotificationFollowUp.NONE,
        )
        notification_mentee.save()

        mentoring.connection.delete()
        mentoring.delete()

        return Response(
            {"detail": "Mentoring and conncetion deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )
