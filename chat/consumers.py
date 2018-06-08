# from channels.generic.websocket import AsyncWebsocketConsumer
# from channels.db import database_sync_to_async
import json
import datetime

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from account.models import Room
from account.models import message as model_message
from django.contrib.auth.models import User


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        
    # Receive message from WebSocket
    def receive(self, text_data):

        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        if message == "":
            return

        user = str(self.scope['user'])
        Id = int(self.room_name)
        rooM = Room.objects.get(id = Id)
        model_message.objects.create(room=rooM, owner=user, content=message)
        
        
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'user': user
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        user = event['user']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message,
            'user': user
        }))
