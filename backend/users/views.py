import datetime

from django.http import JsonResponse
from django.http.response import Http404
from django.shortcuts import render
from django.utils import timezone

from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer


from rest_framework.authentication import (
    BasicAuthentication, 
    SessionAuthentication
)

from .serializers import UserSerializer, TokenSerializer
from .models import CustomUser

class UserListView(ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAdminUser,]

class TokenView(RetrieveDestroyAPIView, CreateModelMixin):
    queryset = Token.objects.all()
    serializer_class = TokenSerializer
    authentication_classes = [BasicAuthentication, SessionAuthentication]


    def get_object(self):
        return Token.objects.get(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        token = self.get_object()
        if token_valid(token.created):
            serialized = self.get_serializer(token)
            return Response(serialized.data)
        else:
            return Response({"message":  "Token has expired. Please reset token for further use"})


def token_valid(created):
    now = timezone.now()
    return now - created < datetime.timedelta(days=60)