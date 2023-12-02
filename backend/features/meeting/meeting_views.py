from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.features.meeting.meeting_serializers import (
    MeetingCreateSerializer,
    MeetingSerializer,
)
from backend.models import Meeting, Mentoring


class MeetingCreate(generics.CreateAPIView):
    serializer_class = MeetingCreateSerializer
    permission_classes = [IsAuthenticated]
    queryset = Meeting.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class MeetingUpdate(generics.UpdateAPIView):
    serializer_class = MeetingCreateSerializer
    permission_classes = [IsAuthenticated]
    queryset = Meeting.objects.all()


class MeetingDelete(generics.DestroyAPIView):
    serializer_class = MeetingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Meeting.objects.filter(author=self.request.user)


class MeetingsCreatedByMe(generics.ListAPIView):
    serializer_class = MeetingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Meeting.objects.filter(author=self.request.user)


class MeetingsFromMyMentors(generics.ListAPIView):
    serializer_class = MeetingSerializer
    permission_classes = [IsAuthenticated]
    model = Meeting

    def get(self, request, *args, **kwargs):
        mentorings = Mentoring.objects.filter(mentee=self.request.user)
        mentors = [mentoring.mentor for mentoring in mentorings]
        meetings = Meeting.objects.filter(author__in=mentors)

        return Response(
            data=self.serializer_class(meetings, many=True).data, status=200
        )
