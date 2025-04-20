from django.contrib import admin
from django.urls import path, include
from users.views import register, login
from rest_framework_simplejwt.views import TokenRefreshView



urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include('products.urls')),

    path('api/register/', register, name='register'),
    path('api/login/', login, name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

