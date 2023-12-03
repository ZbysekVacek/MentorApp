from backend.features.note.note_serializers import NoteSerializer
from backend.models import (
    Note,
)
from rest_framework import generics, permissions


class CreateListNote(generics.ListCreateAPIView):
    """View for creating and listing notes"""

    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)


class UpdateNote(generics.RetrieveUpdateAPIView):
    """View for updating a note"""

    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)


class DeleteNote(generics.DestroyAPIView):
    """View for deleting a note"""

    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)
