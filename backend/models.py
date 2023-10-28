from django.db import models

class Meeting(models.Model):
    subject = models.CharField("Name", max_length=240)
    location = models.TextField()
    dateTime = models.DateTimeField("Registration Date", auto_now_add=True)
    mentorEmail = models.EmailField()
    menteeEmail = models.EmailField()

    def __str__(self):
        return self.subject