from django.db import models
from django.db.models import constraints


# Create your models here.
class Dataset(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    last_queried = models.DateTimeField(auto_now=True)
    last_edited = models.DateTimeField(auto_now_add=True)
    users = models.ManyToManyField(
        to='users.CustomUser',
        through="SetToUser",
        related_name='users'
    )



class SetToUser(models.Model):
    dataset = models.ForeignKey('Dataset', on_delete=models.CASCADE)
    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)
    can_write = models.BooleanField(default=False, null=False, blank=False)
    can_read = models.BooleanField(default=True, null=False, blank=False)
    can_admin = models.BooleanField(default=False, null=False, blank=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['dataset', 'user'], name="unique_dataset_for_user")
        ]


class DataPair(models.Model):
    key = models.CharField(max_length=100, null=False, blank=False)
    value = models.CharField(max_length=100, null=False, blank=False)
    dataset = models.ForeignKey('Dataset', on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['key', 'value', 'dataset'], name="unique_key_value")
        ]