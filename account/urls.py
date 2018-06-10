from django.conf.urls import url
from . import views  
# 利用內建的view funciton
from django.contrib.auth.views import login, logout
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
	url(r'^(?P<page_num>\d+)/$', views.manage, name = "manage"),
	url(r'^cart/(?P<page_num>\d+)/$', views.cart, name = "cart"),
    url(r'^login/$',login, name = "login"),
    url(r'^logout/$',logout, name = "logout"),
    url(r'^register/$', views.register, name = "register"),
    ]
# ]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
