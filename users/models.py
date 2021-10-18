from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    # No extra fields right now
    def __str__(self):
        return self.email
