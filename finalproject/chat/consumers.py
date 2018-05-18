from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.auth import login
import logging
from channels.db import database_sync_to_async


class ChatConsumer(AsyncWebsocketConsumer):


    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        # self.user = self.scope["user"]
        # self.username = await database_sync_to_async(self.get_name)()

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        # login the user to this session.
        # await login(self.scope, self.user)
        # save the session (if the session backend does not access the db you can use `sync_to_async`)
        # await database_sync_to_async(self.scope["session"].save)()

        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))

    # @database_sync_to_async
    # def get_name(self):
    #     return User.objects.all()[0].name
