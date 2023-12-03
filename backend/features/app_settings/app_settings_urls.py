from django.urls import path

from backend.features.app_settings import app_settings_views

app_settings_urls = [
    path("app-settings/", app_settings_views.AppSettingsList.as_view()),
]
