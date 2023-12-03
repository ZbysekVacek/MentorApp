from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from backend.features.user.user_serializers import UserSerializer
from backend.models import Connection, ConnectionRequest


class ConnectionRequestSerializer(serializers.ModelSerializer):
    """Serializer for ConnectionRequest. There is a different serializer for creating a ConnectionRequest"""

    from_user = UserSerializer(many=False, read_only=True)
    to_user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = ConnectionRequest
        fields = "__all__"


class ConnectionRequestCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating a ConnectionRequest"""

    class Meta:
        model = ConnectionRequest
        fields = ("to_user", "from_user")


class ConnectionSerializer(serializers.ModelSerializer):
    """Serializer for Connection model"""

    class Meta:
        model = Connection
        fields = "__all__"


class ConnectionListItemSerializer(serializers.ModelSerializer):
    to = serializers.SerializerMethodField()

    class Meta:
        model = Connection
        exclude = ["first_user", "second_user"]

    @extend_schema_field(UserSerializer)
    def get_to(self, obj):
        user = self.context["request"].user
        other_user = obj.first_user if user != obj.first_user else obj.second_user
        return UserSerializer(other_user).data
