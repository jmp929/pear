import datetime
from re import S
from django.db import transaction

from django.http import JsonResponse, request
from django.http.response import Http404
from django.shortcuts import render
from django.utils import timezone

from rest_framework.authtoken.views import ObtainAuthToken
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
from .models import CustomUser, SurveyToken


class TokenView(RetrieveDestroyAPIView):
    queryset = SurveyToken.objects.all()
    serializer_class = TokenSerializer

    def get_object(self):
        print("----------------------------------")
        print(self.request.user)
        print("-----------------------------------")
        return SurveyToken.objects.get(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        token = self.get_object()
        days_left = self.get_days_left(token.created)
        if days_left > 0:
            serialized = self.get_serializer(token)
            return Response(serialized.data)
        else:
            return Response({"message":  "Token has expired. Please create new token for further use"})

    def post(self, request, *args, **kwargs):
        if not SurveyToken.objects.filter(user=request.user).exists():
            return self.create(request=request, *args, **kwargs)
        else:
            token = self.get_object()
            key = token.save(change=True)
            token = self.get_object()
            serialized = self.get_serializer(token)
            response = Response(serialized.data)
            response.data['key'] = key
            return response

    def create(self, request, *args, **kwargs):
        user = request.user
        new_token = SurveyToken(user=user)
        key = new_token.save()
        token = SurveyToken.objects.get(user=user)
        serialized = self.get_serializer(token)
        response = Response(serialized.data)
        response.data['key'] = key
        return response


    def get_days_left(self, created):
        now = timezone.now()
        return 30 - (now - created).days


