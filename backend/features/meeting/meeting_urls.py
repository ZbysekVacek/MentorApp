from django.urls import path

from backend.features.meeting import meeting_views


"""URLs for meeting"""
meeting_urls = [
    path("meeting/create/", meeting_views.MeetingCreate.as_view()),
    path("meeting/<int:pk>/delete", meeting_views.MeetingDelete.as_view()),
    path("meeting/<int:pk>/update", meeting_views.MeetingUpdate.as_view()),
    path("meeting/", meeting_views.MeetingsCreatedByMe.as_view()),
    path("meeting/from-mentors", meeting_views.MeetingsFromMyMentors.as_view()),
]
