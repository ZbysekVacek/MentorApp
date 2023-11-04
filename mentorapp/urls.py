"""
URL configuration for mentorapp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.schemas import get_schema_view

from backend import views

urlpatterns = [
    path("admin/", admin.site.urls),
    # re_path(r'^api/meetings/$', views.meetings_list),
    re_path(r"^api/meetings/$", views.MeetingsList.as_view()),
    path("api/meetings/<int:pk>", views.MeetingDetail.as_view()),
    path("api/user", views.UserDetail.as_view()),
    # re_path(r"^api/meetings/([0-9])$", views.meetings_detail),
    path("", TemplateView.as_view(template_name="index.html")),
    # Use the `get_schema_view()` helper to add a `SchemaView` to project URLs.
    #   * `title` and `description` parameters are passed to `SchemaGenerator`.
    #   * Provide view name for use with `reverse()`.
    path(
        "openapi",
        get_schema_view(
            title="MentorApp internal API",
            description="Internal API for communication between BE and FE",
            version="1.0.0",
        ),
        name="openapi-schema",
    ),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
