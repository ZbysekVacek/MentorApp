# Generated by Django 4.2.6 on 2023-11-29 14:28

from django.db import migrations


def create_default_data(apps, schema_editor):
    Competency = apps.get_model("backend", "Competency")
    Competency.objects.create(name="Communication")
    Competency.objects.create(name="Problem Solving")
    Competency.objects.create(name="Programming")
    Competency.objects.create(name="Teamwork")
    Competency.objects.create(name="Creativity")
    Competency.objects.create(name="Productivity")
    Competency.objects.create(name="Stress management")
    Competency.objects.create(name="Management")


class Migration(migrations.Migration):
    dependencies = [
        ("backend", "0015_competency"),
    ]

    operations = [
        migrations.RunPython(create_default_data),
    ]
