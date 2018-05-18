from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import chat.routing

from django.conf.urls import url
import chat.consumers


application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(
        	# [url(r'^front(end)/$', chat.consumers.ChatConsumer),]
            chat.routing.websocket_urlpatterns
        )
    ),
})	