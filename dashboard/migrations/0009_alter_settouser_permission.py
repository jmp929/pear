# Generated by Django 3.2.8 on 2021-12-03 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0008_auto_20211203_1531'),
    ]

    operations = [
        migrations.AlterField(
            model_name='settouser',
            name='permission',
            field=models.IntegerField(choices=[(1, 'read'), (2, 'write'), (3, 'admin')], default=1),
        ),
    ]