from django.urls import include, path
from .views import UserListView

urlpatterns = [
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls')),
    path('list/', UserListView.as_view(), name="users_list")
]
