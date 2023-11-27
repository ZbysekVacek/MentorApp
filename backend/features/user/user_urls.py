from django.urls import path

from backend.features.user import user_views

userUrls = [
    path("user", user_views.UserDetail.as_view()),
    path("user/login", user_views.UserLogin.as_view()),
    path("user/logout", user_views.UserLogout.as_view()),
]
