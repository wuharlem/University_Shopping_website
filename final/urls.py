"""final URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls import url, include, handler404
from django.conf.urls.static import static

from account import views as account_views
from post import views as post_views

                  

urlpatterns = [
    url(r'^$', post_views.mainpage, name = "mainpage"),
    url(r'^profile/(?P<user_name>\w+)/$', post_views.profile, name = "profile"),
    url(r'^type/(?P<production_type>\w+)/$', post_views.index, name = "index"),
    url(r'^commodity/', include('post.urls')),
    url(r'^chat/', include('chat.urls')),
    url(r'^account/', include('account.urls')),
    url(r'^oauth/', include('social_django.urls', namespace='social')),
    url(r'^admin/', admin.site.urls),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# ]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# handler404 = account_views.error_404