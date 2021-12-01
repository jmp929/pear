from django.db import models
from django.contrib.auth.models import AbstractUser

from rest_framework.authtoken.models import Token



class CustomUser(AbstractUser):
    # No extra fields right now
    def __str__(self):
        return self.email