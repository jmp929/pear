# Generated by Django 3.2.8 on 2021-12-07 02:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Dataset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('last_queried', models.DateTimeField(auto_now=True)),
                ('last_edited', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='SetToUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('permission', models.CharField(choices=[('R', 'read'), ('W', 'write'), ('A', 'admin')], default='R', max_length=5)),
                ('creater', models.BooleanField(default=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('dataset', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='setToDataset', to='dashboard.dataset')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='setToUser', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='dataset',
            name='users',
            field=models.ManyToManyField(related_name='dataToUsers', through='dashboard.SetToUser', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='DataPair',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=100)),
                ('value', models.CharField(max_length=100)),
                ('dataset', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pairToDataset', to='dashboard.dataset')),
            ],
        ),
        migrations.AddIndex(
            model_name='settouser',
            index=models.Index(fields=['dataset', 'user'], name='dashboard_s_dataset_5923ef_idx'),
        ),
        migrations.AddConstraint(
            model_name='settouser',
            constraint=models.UniqueConstraint(fields=('dataset', 'user'), name='unique_dataset_for_user'),
        ),
        migrations.AddIndex(
            model_name='dataset',
            index=models.Index(fields=['name'], name='dashboard_d_name_6d8a70_idx'),
        ),
        migrations.AddIndex(
            model_name='datapair',
            index=models.Index(fields=['dataset', 'key'], name='dashboard_d_dataset_cd462b_idx'),
        ),
        migrations.AddConstraint(
            model_name='datapair',
            constraint=models.UniqueConstraint(fields=('key', 'dataset'), name='unique_dataset_key'),
        ),
    ]
