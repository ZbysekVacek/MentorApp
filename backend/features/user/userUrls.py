from django.urls import path

from backend.features.user import userViews

userUrls = [
    path("user", userViews.UserDetail.as_view()),
    path("user/login", userViews.UserLogin.as_view()),
    path("user/logout", userViews.UserLogout.as_view()),
]
