from django.urls import path

from backend.features.mentoring import mentoring_views

mentoring_urls = [
    path(
        "mentoring/requests/create/<int:to_user_id>/",
        mentoring_views.CreateMentoringRequest.as_view(),
    ),
    path(
        "mentoring/requests/from-user/",
        mentoring_views.MentoringRequestsFromUser.as_view(),
    ),
    path(
        "mentoring/requests/to-user/",
        mentoring_views.MentoringRequestsToUser.as_view(),
    ),
    path(
        "mentoring/requests/",
        mentoring_views.MentoringRequestsToUser.as_view(),
    ),
    path(
        "mentoring/requests/accept/<int:mentoring_request_id>/",
        mentoring_views.AcceptMentoringRequest.as_view(),
    ),
    path(
        "mentoring/requests/delete/<int:pk>/",
        mentoring_views.DeleteMentoringRequest.as_view(),
    ),
    path(
        "mentoring/<int:pk>/edit/",
        mentoring_views.MentoringEdit.as_view(),
    ),
    path(
        "mentoring/as-mentor/",
        mentoring_views.MentorsMentoringList.as_view(),
    ),
    path(
        "mentoring/as-mentee/",
        mentoring_views.MenteesMentoringsList.as_view(),
    ),
    path(
        "mentoring/<int:pk>/",
        mentoring_views.MentoringRetrieve.as_view(),
    ),
    path(
        "mentoring/<int:pk>/delete/",
        mentoring_views.DeleteMentoring.as_view(),
    ),
]
