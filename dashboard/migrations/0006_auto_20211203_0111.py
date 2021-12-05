# Generated by Django 3.2.8 on 2021-12-03 01:11

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0005_settouser_permission'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='settouser',
            name='at_least_one_permission',
        ),
        migrations.RemoveField(
            model_name='settouser',
            name='can_admin',
        ),
        migrations.RemoveField(
            model_name='settouser',
            name='can_read',
        ),
        migrations.RemoveField(
            model_name='settouser',
            name='can_write',
        ),
        migrations.AddField(
            model_name='settouser',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='settouser',
            name='creater',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='settouser',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]