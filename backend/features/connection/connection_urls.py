from django.urls import path

from backend.features.connection import connection_views

connection_urls = [
    path("connections", connection_views.ConnectionListDetail.as_view()),
    path("connections/<int:pk>/delete", connection_views.ConnectionDelete.as_view()),
    path(
        "connections/requests", connection_views.ConnectionRequestListCreate.as_view()
    ),
    path(
        "connections/requests/<int:pk>",
        connection_views.ConnectionRequestDelete.as_view(),
    ),
    path(
        "connections/requests/<int:pk>/accept",
        connection_views.ConnectionRequestAccept.as_view(),
    ),
]
