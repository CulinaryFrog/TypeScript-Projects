from django.urls import path
from .views import users_view

urlpatterns = [
    path("user/", users_view)
]