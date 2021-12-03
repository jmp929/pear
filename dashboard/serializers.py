from typing import Set
from django.contrib.auth.models import Permission
from django.db.models.query_utils import select_related_descend
from rest_framework import serializers

from users.models import CustomUser

from .models import (
    DataPair,
    Dataset,
    SetToUser
)
from .custom_modules.mixins import (
    MultipleFieldLookupMixin,
    GetRelatedMixin
)
from users.serializers import UserSerializer

class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()


class DataSetUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ("email",)


class DataSetSerializer(GetRelatedMixin, serializers.ModelSerializer):

    class Meta:
        model = Dataset
        exclude = ("created", "last_queried", "last_edited", "users", "id")


class AdminDataSetSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()

    class Meta:
        model = Dataset
        fields = ("created", "last_queried", "last_edited", "users", "id")

    def get_users(self, obj):
        queryset = SetToUser.objects.filter(dataset=obj)
        return [AdminSetToUserSerializer(inst).data for inst in queryset]


class DataPairSerializer(serializers.ModelSerializer):
    # select_related_fields = ['dataset']
    # dataset = DataSetSerializer()
    class Meta:
        model = DataPair
        fields = '__all__'


class AdminSetToUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = SetToUser
        fields = ("email", "permission")
        
