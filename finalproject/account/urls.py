from django.conf.urls import url
from . import views  
# 利用內建的view funciton
from django.contrib.auth.views import login, logout

urlpatterns = [
    url(r'^$', views.index, name = "index"),
    url(r'^account/login/$',login, name = "login"),
    url(r'^account/logout/$',logout, name = "logout"),
    url(r'^account/register/$', views.register, name = "register"),
]
