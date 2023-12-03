from django.urls import path

from backend.features.connection import connection_views

"""URLs for connection"""
connection_urls = [
    path("connections", connection_views.ConnectionListDetail.as_view()),
    path("connections/<int:pk>/delete", connection_views.ConnectionDelete.as_view()),
    path("connections/requests", connection_views.ConnectionRequestList.as_view()),
    path(
        "connections/requests/make",
        connection_views.MakeConnectionRequest.as_view(),
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
