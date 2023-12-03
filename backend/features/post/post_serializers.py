from rest_framework import serializers

from backend.features.user.user_serializers import UserSerializer
from backend.models import Post


class PostSerializer(serializers.ModelSerializer):
    """Serializer for Post model. User is serialized with UserSerializer"""

    author = UserSerializer()

    class Meta:
        model = Post
        fields = "__all__"


class PostCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating a post"""

    class Meta:
        model = Post
        fields = ["title", "content"]
