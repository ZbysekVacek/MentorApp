from django.contrib import admin
from .models import (
    Meeting,
    Profile,
    Notification,
    Competency,
    Connection,
    ConnectionRequest,
    Mentoring,
    MentoringRequest,
    Post,
    Message,
    Note,
    Task,
    AppSettings,
)

"""Register your models here and they will be accessible in the admin panel"""
admin.site.register(Meeting)
admin.site.register(Profile)
admin.site.register(Notification)
admin.site.register(Competency)
admin.site.register(Connection)
admin.site.register(ConnectionRequest)
admin.site.register(Mentoring)
admin.site.register(MentoringRequest)
admin.site.register(Post)
admin.site.register(Message)
admin.site.register(Note)
admin.site.register(Task)
admin.site.register(AppSettings)
