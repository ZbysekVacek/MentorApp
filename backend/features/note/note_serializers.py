from rest_framework import serializers

from backend.models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = [
            "id",
            "author",
            "title",
            "summary",
            "content",
            "created_at",
            "related_meeting",
            "related_mentoring",
        ]
        read_only_fields = ["id", "author"]
