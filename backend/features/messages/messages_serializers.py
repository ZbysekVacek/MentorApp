from rest_framework import serializers


from backend.models import Message


class MessageSerializer(serializers.ModelSerializer):
    """Serializer for Message model"""

    class Meta:
        model = Message
        fields = "__all__"


class MessageSendSerializer(serializers.ModelSerializer):
    """Serializer for sending a message"""

    class Meta:
        model = Message
        fields = ["recipient", "content"]
