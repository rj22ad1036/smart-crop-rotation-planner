from django.urls import path
from .views import predict_crop_and_yield

urlpatterns = [
    path('predict/', predict_crop_and_yield),
]
