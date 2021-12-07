import binascii
import os

from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.hashers import make_password


class CustomUser(AbstractUser):
    # No extra fields right now
    def __str__(self):
        return self.email


class SurveyToken(models.Model):
    key = models.CharField(_("Key"), max_length=128, unique=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name='survey_token',
        on_delete=models.CASCADE, verbose_name=_("User")
    )
    created = models.DateTimeField(_("Created"), auto_now=True)

    def save(self, change=False, *args, **kwargs):
        if not self.key or change:
            key = self.generate_key()
            self.key = make_password(key)
            super().save(*args, **kwargs)
            return key
        return super().save(*args, **kwargs)

    @classmethod
    def generate_key(cls):
        return binascii.hexlify(os.urandom(20)).decode()

    def __str__(self):
        return self.key