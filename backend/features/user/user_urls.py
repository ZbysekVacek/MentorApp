from django.urls import path

from backend.features.user import user_views

userUrls = [
    path("user/current", user_views.UserDetail.as_view()),
    path("user/<int:pk>", user_views.UserDetailById.as_view()),
    path("user/<int:user_id>/profile", user_views.ProfileDetail.as_view()),
    path(
        "user/<int:user_id>/profile/avatar",
        user_views.ProfileUpdateAvatarView.as_view(),
    ),
    path("user/login", user_views.UserLogin.as_view()),
    path("user/logout", user_views.UserLogout.as_view()),
    path("user/register", user_views.UserRegistration.as_view()),
]
