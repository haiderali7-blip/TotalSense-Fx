from rest_framework import serializers

class Serializer(serializers.Serializer):
    prompt = serializers.CharField(max_length=255, required=True)