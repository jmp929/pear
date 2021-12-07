from django.db.models import Q

from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from dashboard.models import (
    DataPair,
    Dataset,
    SetToUser
)

class UsersDataPermission(BasePermission):

    def has_permission(self, request, view):
        if SetToUser.objects.filter(user=request.user, dataset=request.dataset).filter(Q(permission='W') | Q(permission='A')).exists():
            return True
        elif SetToUser.objects.filter(user=request.user, dataset=request.dataset, permission='R').exists() and request.method in SAFE_METHODS:
            return True
        else:
            return False

class DatasetAdminPermission(BasePermission):

    def has_permission(self, request, view):
        if SetToUser.objects.filter(user=request.user, dataset=request.dataset, permission='admin').exists():
            return True
        else:
            return False
            
