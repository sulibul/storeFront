# Generated by Django 5.0.2 on 2024-02-22 15:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_rename_is_admin_customuser_is_super_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='username',
        ),
    ]
