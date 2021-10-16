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
from users.serializers import UserSerializer

class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()


class DataSetSerializer(GetRelatedMixin, serializers.ModelSerializer):
    # prefetch_related_fields = ['users']
    # users = UserSerializer(many=True)

    class Meta:
        model = Dataset
        fields = '__all__'  # need to change later

        


class DataPairSerializer(serializers.ModelSerializer):
    # select_related_fields = ['dataset']
    dataset = DataSetSerializer()
    class Meta:
        model = DataPair
        fields = '__all__'

    # def get_certain_fields(cls, input):
    #     cls.fields = ['name']
        