from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from backend.features.post.post_serializers import PostSerializer, PostCreateSerializer
from backend.models import Post


class CreatePost(generics.CreateAPIView):
    """View for creating a post"""

    serializer_class = PostCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class DeletePost(generics.DestroyAPIView):
    """View for deleting a post"""

    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user)


class ListPosts(generics.ListAPIView):
    """View for listing all posts"""

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
