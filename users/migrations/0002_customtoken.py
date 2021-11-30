# Generated by Django 3.2.8 on 2021-11-30 18:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authtoken', '0003_tokenproxy'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomToken',
            fields=[
                ('token_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authtoken.token')),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
            bases=('authtoken.token',),
        ),
    ]
