from django.urls import path

from backend.features.mentoring_request import mentoring_request_views

mentoring_request_urls = [
    path(
        "mentoring/requests/create/<int:to_user_id>/",
        mentoring_request_views.CreateMentoringRequest.as_view(),
    ),
    path(
        "mentoring/requests/from-user/",
        mentoring_request_views.MentoringRequestsFromUser.as_view(),
    ),
    path(
        "mentoring/requests/to-user/",
        mentoring_request_views.MentoringRequestsToUser.as_view(),
    ),
    path(
        "mentoring/requests/accept/<int:mentoring_request_id>/",
        mentoring_request_views.AcceptMentoringRequest.as_view(),
    ),
    path(
        "mentoring/requests/delete/<int:pk>/",
        mentoring_request_views.DeleteMentoringRequest.as_view(),
    ),
]
