from rest_framework import serializers

from backend.models import Task


class TaskSerializer(serializers.ModelSerializer):
    """Serializer for Task model"""

    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = ["id", "author"]
