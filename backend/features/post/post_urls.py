from django.urls import path

from backend.features.post import post_views

post_urls = [
    path("posts/create/", post_views.CreatePost.as_view()),
    path("posts/delete/<int:pk>/", post_views.DeletePost.as_view()),
    path("posts/", post_views.ListPosts.as_view()),
]
