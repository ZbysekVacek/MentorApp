from django.contrib import admin
from .models import Meeting, Profile, Notification

# Register your models here.
admin.site.register(Meeting)
admin.site.register(Profile)
admin.site.register(Notification)
