from django.contrib import admin
from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.getUserProfile, name='users-profile'),
    path('profile/update/', views.getUserProfile, name='users-profile-update'),
    path('', views.getUsers, name='users'),
    path('register/', views.registerUser, name='register'),
    path('delete/<str:pk>/',views.deleteUser, name='user-delete'),
    path('update/<str:pk>/',views.updateUser, name='update-delete'),
    path('<str:pk>',views.getUserById,name='user')
]


