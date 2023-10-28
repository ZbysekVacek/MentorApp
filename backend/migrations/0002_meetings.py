from django.db import migrations

def create_data(apps, schema_editor):
    Meeting = apps.get_model('backend', 'Meeting')
    Meeting(subject="Test meeting", location="Test location", mentorEmail="mentor@menteromail.com",  menteeEmail="mentee@menteromail.com").save()


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]