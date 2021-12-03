# Generated by Django 3.2.8 on 2021-10-16 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0001_initial'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='datapair',
            name='unique_key_value',
        ),
        migrations.AddConstraint(
            model_name='datapair',
            constraint=models.UniqueConstraint(fields=('key', 'dataset'), name='unique_dataset_key'),
        ),
    ]