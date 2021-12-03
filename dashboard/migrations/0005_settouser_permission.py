# Generated by Django 3.2.8 on 2021-12-03 01:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0004_settouser_at_least_one_permission'),
    ]

    operations = [
        migrations.AddField(
            model_name='settouser',
            name='permission',
            field=models.CharField(choices=[(1, 'read'), (2, 'write'), (3, 'admin')], default=1, max_length=1),
        ),
    ]