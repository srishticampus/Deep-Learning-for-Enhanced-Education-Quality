# Generated by Django 5.1.5 on 2025-01-30 09:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ai_bot_api', '0008_customuser_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='name',
        ),
        migrations.AlterField(
            model_name='customuser',
            name='username',
            field=models.CharField(default='Default Name', max_length=255),
        ),
    ]
