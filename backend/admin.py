from django.contrib import admin
from .models import (
    Meeting,
    Profile,
    Notification,
    Competency,
    Connection,
    ConnectionRequest,
)

# Register your models here.
admin.site.register(Meeting)
admin.site.register(Profile)
admin.site.register(Notification)
admin.site.register(Competency)
admin.site.register(Connection)
admin.site.register(ConnectionRequest)
