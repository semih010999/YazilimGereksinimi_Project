from django.contrib import admin
from django.urls import path, include
from base.views import order_views as views

urlpatterns = [
    path('',views.getOrders,name='orders'),
    path('add/',views.addOrderItems,name='order-add'),
    path('myorders/',views.getMyOrders,name='my-orders'),
    path('<str:pk>',views.getOrderById,name='order'),
    path('<str:pk>/deliver/',views.updateOrderToDelivered,name='order-delivered')
]