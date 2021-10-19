from django.contrib import admin

from .models import (
    Dataset,
    DataPair,
    SetToUser
)


admin.site.register((Dataset, DataPair, SetToUser))