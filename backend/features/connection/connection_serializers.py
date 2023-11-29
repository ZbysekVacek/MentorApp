from rest_framework import serializers

from backend.models import Connection


class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = "__all__"
