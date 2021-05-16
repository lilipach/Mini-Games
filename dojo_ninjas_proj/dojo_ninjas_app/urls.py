from django.urls import path
from . import views 

urlpatterns = [
    path('', views.index),
    path('submitNinja', views.submitNinja),
    path('submitDojo', views.submitDojo),
]