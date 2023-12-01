from django.contrib.auth import get_user_model
from django.core.validators import FileExtensionValidator
from django.db import models
from PIL import Image
from django.core.exceptions import ValidationError


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
        default="media/avatars/default.png",
        blank=True,
        null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=["jpg", "jpeg", "png"]),
            validate_avatar_dimensions,
        ],
    )
    competencies = models.ManyToManyField(Competency)

    def __str__(self):
        # pylint: disable=no-member
        return f"Profile {self.user.username}"


class Notification(models.Model):
    """Notification model is used to show user what is happening with his account"""

    class NotificationFollowUp(models.TextChoices):
        FILL_PROFILE = "FILL_PROFILE", ("Fill your user profile")
        MENTORING_REQUESTS_PAGE = "MENTORING_REQUESTS_PAGE", ("See mentoring requests")
        MENTORINGS_PAGE = "MENTORINGS_PAGE", ("See mentoring page")
        CONNECTION_PAGE = "CONNECTION_PAGE", ("See connections page")
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
    seen = models.BooleanField(null=False, default=False)
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


class Connection(models.Model):
    """Connection model represents a connection between two users"""

    first_user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="connections_first_user",
    )
    second_user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="connections_second_user",
    )
    active = models.BooleanField(default=True, null=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False)

    def __str__(self):
        # pylint: disable=no-member
        return f"Connection {self.first_user.username} - {self.second_user.username}"


class ConnectionRequest(models.Model):
    """Request for a connection from one user to another"""

    from_user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="connection_request_first_user",
    )
    to_user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="connection_request_second_user",
    )

    created_at = models.DateTimeField(auto_now_add=True, null=False)

    def __str__(self):
        # pylint: disable=no-member
        return f"Connection request from {self.from_user.username} to {self.to_user.username}"


class Mentoring(models.Model):
    connection = models.ForeignKey(Connection, on_delete=models.CASCADE)
    settings = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    frequency_days = models.IntegerField()
    objectives = models.TextField(null=True, blank=True)
    mentor = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="mentoring_mentor"
    )
    mentee = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="mentoring_mentee"
    )
    active = models.BooleanField(default=True)

    def __str__(self):
        # pylint: disable=no-member
        return (
            f"Mentoring mentor {self.mentor.username} - mentee {self.mentee.username}"
        )


class MentoringRequest(models.Model):
    from_user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="mentoring_request_from_user",
    )
    to_user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="mentoring_request_to_user",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    text = models.TextField()

    def __str__(self):
        # pylint: disable=no-member
        return f"Mentoring request from {self.from_user.username} to {self.to_user.username}"


class Post(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    title = models.CharField(max_length=255)
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)


class Message(models.Model):
    sender = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="sent_messages"
    )
    recipient = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="received_messages"
    )
    content = models.TextField()
    send_at = models.DateTimeField(auto_now_add=True)
    seen = models.BooleanField(default=False)


class Meeting(models.Model):
    title = models.CharField("Title", max_length=240)
    location = models.TextField()
    created_at = models.DateTimeField("Created Date", auto_now_add=True)
    meeting_date = models.DateTimeField("Meeting Date", null=False)
    description = models.TextField()
    author = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="meeting_author",
        null=False,
    )
    registered_mentee = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="meeting_mentee",
        null=True,
    )

    def __str__(self):
        # pylint: disable=no-member
        return f"Meeting of {self.author.username} - ID{self.id}"


class Note(models.Model):
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    summary = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    related_meeting = models.ForeignKey(
        Meeting, on_delete=models.SET_NULL, null=True, blank=True
    )
    related_mentoring = models.ForeignKey(
        Mentoring, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        # pylint: disable=no-member
        return f"Note of {self.title} - ID{self.id}"


class Task(models.Model):
    author = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="authored_tasks"
    )
    assignee = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="assigned_tasks"
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)
    resolved_at = models.DateTimeField(null=True, blank=True)
    response = models.TextField(null=True, blank=True)
    related_mentoring = models.ForeignKey(
        Mentoring, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        # pylint: disable=no-member
        return f"Task of {self.title} - ID{self.id}"
