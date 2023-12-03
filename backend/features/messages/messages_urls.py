from django.urls import path

from backend.features.messages import messages_views

"""URLs for messages"""
messages_urls = [
    path("messages/send/", messages_views.SendMessage.as_view()),
    path("messages/unseen/", messages_views.ListUnseenMessages.as_view()),
    path("messages/all-users/", messages_views.ListAllMessagesUsers.as_view()),
    path("messages/all/", messages_views.ListAllMessages.as_view()),
    path("messages/mark-seen/", messages_views.MarkAllMessagesAsSeen.as_view()),
]
