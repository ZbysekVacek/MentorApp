from django.urls import path

from backend.features.mentoring import mentoring_views

mentoring_urls = [
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
