# Generated by Django 4.2.6 on 2023-11-27 15:54

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("backend", "0005_profileBlankFieldse"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="about",
            field=models.TextField(default=""),
        ),
        migrations.AlterField(
            model_name="profile",
            name="contact",
            field=models.TextField(default=""),
        ),
        migrations.AlterField(
            model_name="profile",
            name="skills",
            field=models.TextField(default=""),
        ),
    ]
