from datetime import time
from django.utils import timezone

from rest_framework.authtoken.models import Token
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework.authtoken.models import Token

from .models import (
    CustomUser,
) 

class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'last_login', 'date_joined')


class TokenSerializer(ModelSerializer):
    time_left = SerializerMethodField()

    class Meta:
        model = Token
        fields = ('created', 'time_left',)

    def get_time_left(self, token):
        return 30 - (timezone.now() - token.created).days