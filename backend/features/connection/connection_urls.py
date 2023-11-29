from django.urls import path

from backend.features.connection import connection_views

connection_urls = [
    path("connections", connection_views.ConnectionListDetail.as_view()),
]
