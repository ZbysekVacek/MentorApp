from django.urls import path

from backend.features.notification import notification_views

notificationUrls = [
    path("notifications", notification_views.GetAllNotifications.as_view()),
    path("notifications/unseen", notification_views.GetUnseenNotifications.as_view()),
    path(
        "notifications/mark-as-seen",
        notification_views.MarkNotificationsAsSeenView.as_view(),
    ),
]
