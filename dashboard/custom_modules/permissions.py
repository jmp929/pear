from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from dashboard.models import (
    DataPair,
    Dataset,
    SetToUser
)

class UsersDataPermission(BasePermission):

    def has_permission(self, request, view):
        print("fififi")
        if SetToUser.objects.filter(user=request.user, dataset=request.dataset, can_read=True).exists() and request.method in SAFE_METHODS:
            return IsAuthenticated
        else:
            return False
