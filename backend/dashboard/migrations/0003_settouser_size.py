# Generated by Django 3.2.9 on 2021-12-04 09:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0002_auto_20211204_0234'),
    ]

    operations = [
        migrations.AddField(
            model_name='settouser',
            name='size',
            field=models.IntegerField(default=0),
        ),
    ]
