from django.urls import path

from backend.features.task import task_views

task_urls = [
    path("tasks/", task_views.ListCreateTasks.as_view()),
    path("tasks/assigned/", task_views.ListAssignedTasks.as_view()),
    path("tasks/<int:pk>/", task_views.UpdateTask.as_view()),
    path("tasks/<int:pk>/delete", task_views.DeleteTask.as_view()),
]
