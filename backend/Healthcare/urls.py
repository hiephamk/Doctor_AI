
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('prediction/result/', views.predict_diabetes, name='prediction'),
]
