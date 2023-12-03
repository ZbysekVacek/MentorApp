from django.urls import path

from backend.features.note import note_views

"""URLs for notes"""
note_urls = [
    path(
        "notes/<int:pk>/",
        note_views.UpdateNote.as_view(),
    ),
    path(
        "notes/<int:pk>/delete/",
        note_views.DeleteNote.as_view(),
    ),
    path(
        "notes/",
        note_views.CreateListNote.as_view(),
    ),
]
