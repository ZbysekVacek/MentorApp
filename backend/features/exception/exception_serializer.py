from rest_framework import serializers


class ExceptionSerializer(serializers.Serializer):
    """Serializer for exceptions model"""

    status_code = serializers.IntegerField(required=False)
    detail = serializers.CharField(required=False)
