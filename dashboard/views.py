from django.db.models import query
from django.http.response import HttpResponse
from django.shortcuts import render
import json
from rest_framework import status, generics, mixins
from rest_framework.decorators import action, authentication_classes, api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from rest_framework.authentication import (
    BasicAuthentication, 
    SessionAuthentication
)
from django.db import transaction

from users.models import CustomUser

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
    # GetRelatedMixin
)
from .custom_modules.permissions import (
    UsersDataPermission
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
    authentication_classes = [TimeLimitTokenAuthentication]


class UserDataSetsView(MultipleFieldLookupMixin, generics.ListCreateAPIView):
    queryset = Dataset.objects.all()
    # serializer_class = DataSetSerializer
    lookup_fields = ['dataset']
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication, SessionAuthentication]

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
    authentication_classes = [BasicAuthentication, SessionAuthentication]

    def patch(self, request, *args, **kwargs):
        if 'key' and 'value' in request.data:
            return self.partial_update(request, *args, **kwargs)
        else:
            print("values missing")
            raise

    def get_queryset(self, *args, **kwargs):
        return DataPair.objects.all()
        # return self.get_serializer_class().get_related(queryset)



# retrieve works, delete works, need to make custom edit that only allows a change to key value
class UserDataSetView(UsersDataPermission, generics.ListAPIView):
    queryset = DataPair.objects.all()
    serializer_class = DataPairSerializer
    # lookup_fields = []
    authentication_classes = [BasicAuthentication, SessionAuthentication]

    def list(self, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        dataset = self.get_dataset()
        permission_level = get_dataset_permission_level(self.request)
        objs = {
            'dataset': json.dumps(dataset, indent=4, sort_keys=True, default=str),
            'data_pairs': serializer.data,
            'permission_level': json.dumps(permission_level),
        }
        if permission_level == "ADMIN":
            other_users = self.get_other_users()
            objs["other_users"] = json.dumps(other_users, indent=4, sort_keys=True, default=str)
        return Response(objs)

    def get_dataset(self):
        dataset_name = self.kwargs['dataset_name']
        dataset = Dataset.objects.filter(name=dataset_name).values()[0]
        return dataset

    
    def get_other_users(self):
        dataset_name = self.kwargs['dataset_name']
        dataset = Dataset.objects.get(name=dataset_name)

        other_users = SetToUser.objects.filter(dataset=dataset).select_related("user").values("can_read", "can_write", "can_admin", "user__email")

        return other_users
        

    def get_queryset(self):
        dataset_name = self.kwargs['dataset_name']
        dataset = Dataset.objects.filter(name=dataset_name)[0]
        data_pairs =  DataPair.objects.filter(dataset=dataset)
        return data_pairs

@api_view(['POST', 'PUT', 'DELETE'])
@authentication_classes([SessionAuthentication, BasicAuthentication]) 
def manage_dataset_users(request, *args, **kwargs):
    permission_level = get_dataset_permission_level(request)
    if permission_level == "ADMIN":
        target_user = CustomUser.objects.get(email=request.email)
        if SetToUser.objects.filter(user=target_user, dataset=request.dataset).exists() and request.method == "PUT":
            set_to_user = SetToUser.objects.filter(user=target_user, dataset=request.dataset)[0]
            level = request.permission
            with transaction.atomic():
                set_to_user.can_admin = True if level == "can_admin" else False
                set_to_user.can_write = True if level == "can_admin" or level == "can_write" else False
                set_to_user.can_read = True if level == "can_admin" or level == "can_write" or level == "can_read" else False
                set_to_user.save()
            return HttpResponse(status=201)
        elif SetToUser.objects.filter(user=target_user, dataset=request.dataset).exists() and request.method == "DELETE":
            SetToUser.objects.filter(user=target_user).delete()
            return HttpResponse(status=201)
        elif not SetToUser.objects.filter(user=target_user, dataset=request.dataset).exists() and request.method == "POST":
            level = request.permission
            new_set_to_user = SetToUser(
                user = target_user,
                dataset = request.dataset,
                can_admin = True if level == "can_admin" else False,
                can_write = True if level == "can_admin" or level == "can_write" else False,
                can_read = True if level == "can_admin" or level == "can_write" or level == "can_read" else False,
            )
            return HttpResponse(status=201)
        else:
            return HttpResponse(status=400)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication]) 
def get_dataset_users(request, *args, **kwargs):
    permission_level = get_dataset_permission_level(request)
    if permission_level == "ADMIN" and Dataset.objects.filter(name=request.dataset_name).exists():
        dataset_name = request.dataset_name
        dataset = Dataset.objects.get(name=dataset_name)
        other_users = SetToUser.objects.filter(dataset=dataset).select_related("user").values("can_read", "can_write", "can_admin", "user__email")
        
        return Response({
            "users": json.dumps(other_users, indent=4, sort_keys=True, default=str)
            }
            )
    else:
        return HttpResponse(status=400)



def get_dataset_permission_level(request):
        if SetToUser.objects.filter(user=request.user, dataset=request.dataset, can_admin=True).exists():
            return "ADMIN"
        elif SetToUser.objects.filter(user=request.user, dataset=request.dataset, can_write=True).exists():
            return "WRITE"
        elif SetToUser.objects.filter(user=request.user, dataset=request.dataset, can_read=True).exists():
            return "READ"
        else:
            return None




