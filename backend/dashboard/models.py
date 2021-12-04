from django.db import models
from users.models import CustomUser
from django.db.models import constraints, indexes

PERMISSIONS = (
    ('R', 'read'),
    ('W', 'write'),
    ('A', 'admin'),
)


class Dataset(models.Model):
    name = models.CharField(max_length=50, null=False,
                            blank=False, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    last_queried = models.DateTimeField(auto_now=True)
    last_edited = models.DateTimeField(auto_now_add=True)
    users = models.ManyToManyField(
        to=CustomUser,
        through="SetToUser",
        related_name='dataToUsers'
    )

    class Meta:
        indexes = [
            models.Index(fields=['name', ])
        ]


class SetToUser(models.Model):
    dataset = models.ForeignKey(
        Dataset, related_name="setToDataset", on_delete=models.CASCADE)
    user = models.ForeignKey(
        CustomUser, related_name="setToUser", on_delete=models.CASCADE)
    permission = models.CharField(
        max_length=5, choices=PERMISSIONS, default='W')
    can_write = models.BooleanField(default=False)
    can_read = models.BooleanField(default=True)
    can_admin = models.BooleanField(default=False)
    creater = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['dataset', 'user'], name="unique_dataset_for_user"),
        ]
        indexes = [
            models.Index(fields=['dataset', 'user', ]),
        ]


class DataPair(models.Model):
    key = models.CharField(max_length=100, null=False, blank=False)
    value = models.CharField(max_length=100, null=False, blank=False)
    dataset = models.ForeignKey(
        Dataset, related_name="pairToDataset", on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['key', 'dataset'], name="unique_dataset_key")
        ]
        indexes = [
            models.Index(fields=['dataset', 'key', ]),
        ]
