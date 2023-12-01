from rest_framework import serializers

from backend.features.user.user_serializers import UserSerializer
from backend.models import Post


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Post
        fields = "__all__"


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["title", "content"]
