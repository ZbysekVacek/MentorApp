from rest_framework import generics, permissions

from backend.features.competency.competency_serializers import CompetencySerializer
from backend.models import Competency


class CompetencyDetail(generics.ListAPIView):
    serializer_class = CompetencySerializer
    queryset = Competency.objects.all()
    permission_classes = [permissions.IsAuthenticated]
