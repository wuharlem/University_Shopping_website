from django.conf.urls import url
from . import views  
# 利用內建的view funciton
from django.contrib.auth.views import login, logout
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    url(r'^post/$', views.post, name = "post"),
    url(r'^(?P<article_id>[^/]+)/$', views.commodity, name = "commodity"),
    ]
