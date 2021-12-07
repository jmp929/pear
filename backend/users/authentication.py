import datetime

from django.conf import settings
from django.utils import timezone
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password, check_password, is_password_usable, get_hasher, identify_hasher
from django.utils.translation import gettext_lazy as _


from users.models import CustomUser, SurveyToken


class TimeLimitTokenAuthentication(TokenAuthentication):

    model = SurveyToken

    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = self.check_token(key)    #type: ignore
        except Exception as e:
            raise AuthenticationFailed(
                {"error": "Invalid token", "is_authenticated": False}
            )

        if not token.user.is_active:
            raise AuthenticationFailed(_('User inactive or deleted.'))
    
        now = timezone.now()

        if now - token.created > datetime.timedelta(days=30):
            raise AuthenticationFailed(
                {"error": "Token expired", "is_authenticated": False}
            )
        
        return token.user, token

    def check_token(self, raw_key, setter=None, preferred='default'):
        # or not is_password_usable(encoded)
        model = self.get_model()
        if raw_key is None:
            return False

        for token in model.objects.all():
            encoded = token.key
            try:
                hasher = identify_hasher(encoded)
            except ValueError:
                continue

            is_correct = hasher.verify(raw_key, encoded)
            
            if is_correct:
                return token
        raise

