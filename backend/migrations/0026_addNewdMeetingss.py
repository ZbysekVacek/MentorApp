# Generated by Django 4.2.6 on 2023-11-30 20:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("backend", "0025_removeOldMeetingss"),
    ]

    operations = [
        migrations.CreateModel(
            name="Meeting",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=240, verbose_name="Title")),
                ("location", models.TextField()),
                (
                    "created_at",
                    models.DateTimeField(
                        auto_now_add=True, verbose_name="Created Date"
                    ),
                ),
                ("meeting_date", models.DateTimeField(verbose_name="Meeting Date")),
                ("description", models.TextField()),
                (
                    "author",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="meeting_author",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "registered_mentee",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="meeting_mentee",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
