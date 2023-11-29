from rest_framework import serializers

from backend.models import Competency


class CompetencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Competency
        fields = "__all__"
