from rest_framework.response import Response
from rest_framework import generics

from .models import Meeting
from .serializers import *


class MeetingsList(generics.ListCreateAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

    def get(self, request, *args, **kwargs):
        data = Meeting.objects.all()
        serializer = MeetingSerializer(data, context={"request": request}, many=True)

        return Response(serializer.data)


class MeetingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
