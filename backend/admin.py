from django.contrib import admin
from .models import Meeting, Profile, Notification, Competency

# Register your models here.
admin.site.register(Meeting)
admin.site.register(Profile)
admin.site.register(Notification)
admin.site.register(Competency)
