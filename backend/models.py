from django.contrib.auth import get_user_model
from django.core.validators import FileExtensionValidator
from django.db import models
from PIL import Image
from django.core.exceptions import ValidationError


class Meeting(models.Model):
    subject = models.CharField("Name", max_length=240)
    location = models.TextField()
    dateTime = models.DateTimeField("Registration Date", auto_now_add=True)
    mentorEmail = models.EmailField()
    menteeEmail = models.EmailField()

    def __str__(self):
        return self.subject


class Competency(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Profile(models.Model):
    """Profile model is used to store additional information about the user"""

    # # pylint: disable=no-self-argument
    def validate_avatar_dimensions(value):
        width, height = Image.open(value).size
        if width < 100 or height < 100 or width > 500 or height > 500:
            raise ValidationError(
                "Image dimensions must be between 100x100 and 500x500 pixels."
            )

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
    avatar = models.ImageField(
        # TODO MentorApp: could be improved by renaming file to user_id
        upload_to="media/avatars/",
        blank=True,
        null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=["jpg", "jpeg", "png"]),
            validate_avatar_dimensions,
        ],
    )
    competencies = models.ManyToManyField(Competency)


class Notification(models.Model):
    """Notification model is used to show user what is happening with his account"""

    class NotificationFollowUp(models.TextChoices):
        FILL_PROFILE = "FILL_PROFILE", ("Fill your user profile")
        NONE = "NONE", ("No followup action")

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
    followup = models.CharField(
        max_length=255,
        choices=NotificationFollowUp.choices,
        default=NotificationFollowUp.NONE,
    )
    content = models.TextField(max_length=255, null=False)

    def __str__(self):
        # pylint: disable=E1101
        return f"{self.user.username} - {self.title}"
