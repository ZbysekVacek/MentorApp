from rest_framework import serializers

from backend.features.user.user_serializers import UserSerializer
from backend.models import Connection


class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = "__all__"


class ConnectionListItemSerializer(serializers.ModelSerializer):
    to = serializers.SerializerMethodField()

    class Meta:
        model = Connection
        exclude = ["first_user", "second_user"]

    def get_to(self, obj):
        user = self.context["request"].user
        other_user = obj.first_user if user != obj.first_user else obj.second_user
        return UserSerializer(other_user).data