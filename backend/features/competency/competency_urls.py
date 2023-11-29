from django.urls import path

from backend.features.competency import competency_views

competency_urls = [
    path("competency/all", competency_views.CompetencyDetail.as_view()),
]
