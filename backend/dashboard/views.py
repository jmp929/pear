from typing import Set
from django.core.exceptions import PermissionDenied
from django.db.models import query
from django.http import request
from django.http.response import HttpResponse
from django.shortcuts import render
import json
from django.forms.models import model_to_dict
from rest_framework import status, generics, mixins
from rest_framework.decorators import action, authentication_classes, api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.authentication import (
    BasicAuthentication, 
    SessionAuthentication,
    TokenAuthentication
)
from django.db import transaction

from users.models import CustomUser

from .models import (
    Dataset,
    DataPair,
    SetToUser,
    PERMISSIONS
)
from .serializers import (
    AdminDataSetSerializer,
    DataPairSerializer,
    DataSetSerializer,
    FileUploadSerializer,
    AdminSetToUserSerializer
)
from .custom_modules.mixins import (
    MultipleFieldLookupMixin,
    # GetRelatedMixin
)
from .custom_modules.permissions import (
    UsersDataPermission,
    DatasetAdminPermission
)
from .custom_modules.validators import (
    FileValidator
)
from .data_interactions.ingestion import IngestData
from users.authentication import TimeLimitTokenAuthentication


class DataPairSurveyView(UsersDataPermission, MultipleFieldLookupMixin, generics.RetrieveAPIView):
    queryset = DataPair.objects.all()
    serializer_class = DataPairSerializer
    lookup_fields = ['key', 'dataset']
    authentication_classes = (TimeLimitTokenAuthentication,)


class UserDataSetsView(MultipleFieldLookupMixin, generics.ListCreateAPIView):
    queryset = Dataset.objects.all()
    lookup_fields = ['dataset']
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return DataSetSerializer
        else:
            return FileUploadSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Dataset.objects.filter(users=self.request.user)
        return queryset

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


# retrieve works, delete works, need to make custom edit that only allows a change to key value
class UserDataPairView(UsersDataPermission, MultipleFieldLookupMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = DataPair.objects.all()
    serializer_class = DataPairSerializer
    lookup_fields = ['key', 'value', 'dataset']
    authentication_classes = (TokenAuthentication,)

    def patch(self, request, *args, **kwargs):
        if 'key' not in request.data or 'value' not in request.data:
            raise ValidationError("Must be key and value in request")
        return self.partial_update(request, *args, **kwargs)


# retrieve works, delete works, need to make custom edit that only allows a change to key value
class UserDataSetView(UsersDataPermission, generics.ListAPIView):
    queryset = DataPair.objects.all()
    serializer_class = DataPairSerializer
    authentication_classes = (TokenAuthentication, BasicAuthentication)
        

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        dataset = self.get_dataset()
        set_to_user = self.get_set_to_user(dataset, request.user)
        data = {
            'dataset': AdminDataSetSerializer(dataset).data if self.is_admin(set_to_user) else DataSetSerializer(dataset).data,
            'dataset_size': json.dumps(DataPair.objects.filter(dataset=dataset).count()),
            'data_pairs': serializer.data,
            'permission_level': f'{set_to_user.permission}',
        }
        return Response(data)

    def get_dataset(self):
        try:
            dataset_name = self.kwargs['dataset_name']
            dataset =  Dataset.objects.get(name=dataset_name)
            return dataset
        except Dataset.DoesNotExist:
            raise NotFound()

    def get_set_to_user(self, dataset, user):
        
        try:
            return SetToUser.objects.get(dataset=dataset, user=user)
        except SetToUser.DoesNotExist:
            raise NotFound()
    
    def get_other_users(self):
        dataset_name = self.kwargs['dataset_name']
        dataset = Dataset.objects.get(name=dataset_name)

        other_users = SetToUser.objects.filter(dataset=dataset).select_related("user").values("permission", "user__email")

        return other_users

    def is_admin(self, set_to_user):
        return set_to_user.permission == 'A'
        

    def get_queryset(self):
        dataset_name = self.kwargs['dataset_name']
        dataset = Dataset.objects.filter(name=dataset_name)[0]
        data_pairs =  DataPair.objects.filter(dataset=dataset)
        return data_pairs

@api_view(['POST', 'PUT', 'DELETE'])
@authentication_classes([TokenAuthentication]) 
def manage_dataset_users(request, *args, **kwargs):
    try:
        dataset = Dataset.objects.get(name=request.dataset_name)
    except Dataset.DoesNotExist:
        raise NotFound(f"No dataset found with name {request.dataset_name}")

    try:
        set_to_user = SetToUser.objects.get(user=request.user, dataset=dataset)
    except SetToUser.DoesNotExist:
        raise NotFound(f"{request.user} does not have access to {dataset.name}")

    if set_to_user.permission == "admin":
        target_user = CustomUser.objects.get(email=request.email)
        if SetToUser.objects.filter(user=target_user, dataset=request.dataset).exists():
            if request.method == "PUT":
                set_to_user.permission = request.permission
            elif request.method == "DELETE":
                set_to_user.delete()
            set_to_user.save()
            return HttpResponse(status=201)
        elif request.method == "POST":
            new_set_to_user = SetToUser(
                user = target_user,
                dataset = request.dataset,
                permission = request.permission
            )
            new_set_to_user.save()
            return HttpResponse(status=201)
    return HttpResponse(status=400)

@api_view(['GET'])
@authentication_classes([TokenAuthentication, BasicAuthentication]) 
def get_dataset_users(request, *args, **kwargs):
    
    try:
        dataset = Dataset.objects.get(name=request.GET.get("dataset_name"))
    except Dataset.DoesNotExist:
        raise NotFound("Dataset not found")

    try:
        set_to_user = SetToUser.objects.get(user=request.user, dataset=dataset)
    except SetToUser.DoesNotExist:
        raise NotFound(f"{request.user} does not have access to {dataset.name}")

    if set_to_user.permission == 'admin':
        other_users = SetToUser.objects.filter(dataset=dataset).select_related("user").values("can_read", "can_write", "can_admin", "user__email")
        
        return Response({
            "users": json.dumps(other_users, indent=4, sort_keys=True, default=str)
            }
            )
    else:
        raise PermissionDenied(f"{request.user} does not have necessary permissions for {dataset.name}")


class SetToUserView(generics.RetrieveUpdateDestroyAPIView, mixins.CreateModelMixin, mixins.ListModelMixin):
    serializer_class = AdminSetToUserSerializer

    def get_queryset(self):
        if self.request.method == "GET":
            return SetToUser.objects.filter(dataset=self.get_dataset())

    def get_dataset(self):
        dataset_name = self.kwargs['dataset_name']
        dataset = Dataset.objects.get(name=dataset_name)
        return dataset

    def get_object(self):
        dataset = self.get_dataset()
        return SetToUser.objects.get(user=self.request.user, dataset=dataset)

    def has_permission(self):
        return self.get_object().permission == 'A'

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
        # queryset = self.get_queryset()
        # serialized = self.get_serializer_class()(queryset)
        # return Response(serialized.data)

    def post(self, request, *args, **kwargs):
        try:
            target_user = CustomUser.objects.get(email=request.email)
        except CustomUser.DoesNotExist:
            raise NotFound()

        if SetToUser.objects.filter(dataset=self.get_dataset(), user=target_user).exists():
            raise ValidationError()      

        new_set_to_user = SetToUser(
                user = target_user,
                dataset = self.get_dataset(),
                permission = request.permission
            )
        new_set_to_user.save()
        return HttpResponse(status=201)

    def put(self, request, *args, **kwargs):
        try:
            target_user = CustomUser.objects.get(email=request.data['email'])
        except CustomUser.DoesNotExist:
            raise NotFound()

        try:
            target_set_to_user = SetToUser.objects.get(dataset=self.get_dataset(), user=target_user)
        except SetToUser.DoesNotExist:
            raise NotFound()

        target_set_to_user.permission = request.data['permission']
        target_set_to_user.save()
        return HttpResponse(status=201)

    def delete(self, request, *args, **kwargs):
        try:
            target_user = CustomUser.objects.get(email=request.data['email'])
        except CustomUser.DoesNotExist:
            raise NotFound()

        try:
            target_set_to_user = SetToUser.objects.get(dataset=self.get_dataset(), user=target_user)
        except SetToUser.DoesNotExist:
            raise NotFound()

        target_set_to_user.delete()
        return HttpResponse(status=201)








