from django.db import transaction
import csv

from dashboard.helpers import split_every
from dashboard.models import (
    Dataset,
    DataPair,
    SetToUser
)
from users.models import CustomUser

class IngestData:

    def __init__(self, user, dataset_name):
        dataset = Dataset.objects.filter(name=dataset_name)
        if not dataset.exists():
            self.dataset = Dataset.objects.create(name=dataset_name)
            SetToUser.objects.create(user=user, dataset=self.dataset, can_write=True, can_read=True, can_admin=True)
        else:
            permissions = SetToUser.objects.filter(user=user, dataset=dataset[0]).values('can_write', 'can_admin')[0]
            if permissions.get('can_write') == True or permissions.get('can_admin') == True:
                self.dataset = Dataset.objects.get(name=dataset_name, users=user)
       

    def get_csv_data(self, csv_file):
        csv_data = [row for row in csv.reader(csv_file.read().decode('utf-8').splitlines())]

        if len(csv_data) == 0:
            raise Exception("Empty Dataset")
        elif len(csv_data[0]) != 2:
            raise Exception("Invalid number of columns. Must be 2")
        return csv_data
    
    def ingest_csv(self, csv_file):
        csv_data = self.get_csv_data(csv_file)

        for lines in split_every(csv_data):
            objs = []
            for line in lines:
                objs.append(DataPair(key=line[0], value=line[1], dataset=self.dataset))
            print(objs)
            DataPair.objects.bulk_create(objs, ignore_conflicts=True)
        return True