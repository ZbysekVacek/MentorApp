from rest_framework import serializers


class ExceptionSerializer(serializers.Serializer):
    status_code = serializers.IntegerField(required=False)
    detail = serializers.CharField(required=False)
