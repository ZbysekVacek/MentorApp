# Generated by Django 4.2.6 on 2023-11-30 20:21

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("backend", "0024_addMessages"),
    ]

    operations = [
        migrations.DeleteModel(
            name="Meeting",
        ),
    ]