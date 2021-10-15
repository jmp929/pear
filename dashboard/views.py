from django.db.models import query
from django.http.response import HttpResponse
from django.shortcuts import render
from rest_framework import status, generics, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from rest_framework.authentication import (
    BasicAuthentication, 
    TokenAuthentication
)
from django.db import transaction

from .models import (
    Dataset,
    DataPair,
    SetToUser,
)
from .serializers import (
    DataPairSerializer,
    DataSetSerializer,
    FileUploadSerializer
)
from .custom_modules.mixins import (
    MultipleFieldLookupMixin,
    GetRelatedMixin
)
from .custom_modules.permissions import (
    UsersDataPermission
)
from .custom_modules.validators import (
    FileValidator
)
from .data_interactions.ingestion import IngestData


class UploadFileView(generics.CreateAPIView):
    serializer_class = DataPairSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        file_type, issue = FileValidator(file)
        if file_type is None:
            return HttpResponse(status=400, headers={'error': issue})
        ingestor = IngestData(request.user, request.dataset_name)
        success = ingestor.ingest_csv(file)

        if success:
            return HttpResponse(status=201)
        else:
            return HttpResponse(status=400, headers={'error': issue})

        
class DataPairSurveyView(UsersDataPermission, MultipleFieldLookupMixin, generics.RetrieveAPIView):
    queryset = DataPair.objects.all()
    serializer_class = DataPairSerializer
    lookup_fields = ['key', 'dataset']
    authentication_classes = [BasicAuthentication]


class UserDataSetsView(MultipleFieldLookupMixin, generics.ListCreateAPIView):
    queryset = Dataset.objects.all()
    # serializer_class = DataSetSerializer
    lookup_fields = ['dataset']
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, BasicAuthentication]

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return DataSetSerializer
        else:
            return FileUploadSerializer
            

    def get_queryset(self, *args, **kwargs):
        queryset = Dataset.objects.filter(users=self.request.user)
        return self.get_serializer_class().get_related(self, queryset)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        file_type = FileValidator(file)
        ingestor = IngestData(request.user, request.data['dataset_name'])
        success = ingestor.ingest_csv(file)

        if success:
            return HttpResponse(status=201)
        else:
            return HttpResponse(status=400)

    

# class UserDataSetDataView(UsersDataPermission, generics.ListAPIView)












        