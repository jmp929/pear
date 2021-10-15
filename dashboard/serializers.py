from django.db.models.query_utils import select_related_descend
from rest_framework import serializers

from .models import (
    DataPair,
    Dataset
)
from .custom_modules.mixins import (
    MultipleFieldLookupMixin,
    GetRelatedMixin
)

class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()

class DataPairSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataPair
        fields = ('key', 'value')

class DataSetSerializer(GetRelatedMixin, serializers.ModelSerializer):
    prefetch_related_fields = ('users')
    class Meta:
        model = Dataset
        fields = '__all__'  # need to change later