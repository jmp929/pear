from django.urls import include, path

from rest_framework.authtoken.views import obtain_auth_token

from .views import (
    TokenView
)

urlpatterns = [
    path('auth/', include('rest_auth.urls')),
    path('auth/create_token/', obtain_auth_token, name="create_auth_token"),
    path('auth/token/', TokenView.as_view(), name="auth_token"),
    path('auth/register/', include('rest_auth.registration.urls')),
]
