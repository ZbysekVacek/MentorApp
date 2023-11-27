from django.contrib.auth import get_user_model
from django.db import models


class Meeting(models.Model):
    subject = models.CharField("Name", max_length=240)
    location = models.TextField()
    dateTime = models.DateTimeField("Registration Date", auto_now_add=True)
    mentorEmail = models.EmailField()
    menteeEmail = models.EmailField()

    def __str__(self):
        return self.subject


class Profile(models.Model):
    """Profile model is used to store additional information about the user"""

    #  Link to the user model
    user = models.OneToOneField(
        get_user_model(), on_delete=models.CASCADE, related_name="profile"
    )
    # Show user as a mentor who accepts mentees
    accepts_mentees = models.BooleanField(blank=False, default=False)
    # General information the  user wants to share about themselves
    about = models.TextField(blank=True, null=True)
    # Contact information the user wants to share
    contact = models.TextField(blank=True, null=True)
    # In what skills can user share knowledge
    skills = models.TextField(blank=True, null=True)
