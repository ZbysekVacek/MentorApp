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
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from backend import views
from backend.features.connection.connection_urls import connection_urls
from backend.features.mentoring.mentoring_urls import mentoring_urls
from backend.features.notification.notification_urls import notification_urls
from backend.features.competency.competency_urls import competency_urls
from backend.features.post.post_urls import post_urls
from backend.features.user.user_urls import user_urls

urlpatterns = [
    path("admin/", admin.site.urls),
    re_path(r"^api/meetings/$", views.MeetingsList.as_view()),
    path("api/meetings/<int:pk>", views.MeetingDetail.as_view()),
    path("", TemplateView.as_view(template_name="index.html")),
    path("api/", include(user_urls)),
    path("api/", include(competency_urls)),
    path("api/", include(notification_urls)),
    path("api/", include(connection_urls)),
    path("api/", include(mentoring_urls)),
    path("api/", include(post_urls)),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    # If you need Redoc, just uncomment
    # path(
    #     "api/schema/redoc/",
    #     SpectacularRedocView.as_view(url_name="schema"),
    #     name="redoc",
    # ),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
