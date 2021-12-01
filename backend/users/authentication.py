import datetime

from django.conf import settings
from django.utils import timezone
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authtoken.models import Token


from users.models import CustomUser

class TimeLimitTokenAuthentication(TokenAuthentication):

    model = Token

    def authenticate(self, key, request=None):
        try:
            token = Token.objects.select_related("user").get(key=key)
        except Exception as e:
            raise AuthenticationFailed(
                {"error": "Invalid token", "is_authenticated": False}
            )

        if not token.user.is_active:
            raise AuthenticationFailed(
                {"error": "Invalid user", "is_authenticated": False}
            )
    
        now = timezone.now()

        if now - token.created > datetime.timedelta(days=60):
            raise AuthenticationFailed(
                {"error": "Token expired", "is_authenticated": False}
            )
        
        return token.user, token

