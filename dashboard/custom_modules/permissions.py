from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from dashboard.models import (
    DataPair,
    Dataset,
    SetToUser
)

class UsersDataPermission(BasePermission):

    def has_permission(self, request, view):
        if SetToUser.objects.filter(user=request.user, dataset=request.dataset, can_read=True).exists() and request.method in SAFE_METHODS:
            return True
        elif SetToUser.objects.filter(user=request.user, dataset=request.dataset, can_write=True).exists():
            return True
        else:
            return False

    def get_permission_level(self):
        request = self.request
        if SetToUser.objects.filter(user=request.user, dataset=request.dataset, can_admin=True).exists():
            return "ADMIN"
        elif SetToUser.objects.filter(user=request.user, dataset=request.dataset, can_write=True).exists():
            return "WRITE"
        elif SetToUser.objects.filter(user=request.user, dataset=request.dataset, can_read=True).exists():
            return "READ"
        else:
            return None
            
