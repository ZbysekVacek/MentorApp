from backend.features.task.task_serializers import TaskSerializer
from backend.models import (
    Task,
)
from rest_framework import generics, permissions


class ListCreateTasks(generics.ListCreateAPIView):
    """View for creating and listing tasks"""

    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ListAssignedTasks(generics.ListAPIView):
    """View for listing all tasks assigned to the current user"""

    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(assignee=self.request.user)


class UpdateTask(generics.RetrieveUpdateAPIView):
    """View for updating a task"""

    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(assignee=self.request.user) | Task.objects.filter(
            author=self.request.user
        )


class DeleteTask(generics.DestroyAPIView):
    """View for deleting a task"""

    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(author=self.request.user)
