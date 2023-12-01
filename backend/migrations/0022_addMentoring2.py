# Generated by Django 4.2.6 on 2023-11-30 17:37

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("backend", "0021_addMentoringt"),
    ]

    operations = [
        migrations.AlterField(
            model_name="notification",
            name="followup",
            field=models.CharField(
                choices=[
                    ("FILL_PROFILE", "Fill your user profile"),
                    ("MENTORING_REQUESTS_PAGE", "See mentoring requests"),
                    ("MENTORINGS_PAGE", "See mentoring page"),
                    ("NONE", "No followup action"),
                ],
                default="NONE",
                max_length=255,
            ),
        ),
        migrations.AlterField(
            model_name="notification",
            name="seen",
            field=models.BooleanField(default=False),
        ),
    ]
