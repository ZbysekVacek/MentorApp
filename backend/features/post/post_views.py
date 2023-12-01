from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from backend.features.post.post_serializers import PostSerializer, PostCreateSerializer
from backend.models import Post


class CreatePost(generics.CreateAPIView):
    serializer_class = PostCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class DeletePost(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user)


class ListPosts(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
