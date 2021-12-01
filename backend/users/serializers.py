from rest_framework.authtoken.models import Token
from rest_framework.serializers import ModelSerializer
from rest_framework.authtoken.models import Token

from .models import (
    CustomUser,
) 

class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'last_login', 'date_joined')


class TokenSerializer(ModelSerializer):
    class Meta:
        model = Token
        fields = ('key', 'created')