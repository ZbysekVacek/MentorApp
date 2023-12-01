from rest_framework import serializers


from backend.models import Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"


class MessageSendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["recipient", "content"]
