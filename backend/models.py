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
    about = models.TextField(default="")
    # Contact information the user wants to share
    contact = models.TextField(default="")
    # In what skills can user share knowledge
    skills = models.TextField(default="")


class Notification(models.Model):
    """Notification model is used to show user what is happening with his account"""

    # Link to the user model
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="notifications"
    )
    # Source of the notification. Doesn't have to be defined
    source = models.CharField(max_length=255, null=True)
    # When was the notification created - defaults to now
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    # Has the user seen the notification
    seen = models.BooleanField(null=False)
    # Title of the notification
    title = models.CharField(max_length=255, null=False)
    # Followup action. Can be empty
    followup = models.CharField(max_length=255, null=True)
    content = models.TextField(max_length=255, null=False)

    def __str__(self):
        # pylint: disable=E1101
        return f"{self.user.username} - {self.title}"
