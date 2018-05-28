from django.contrib import admin

# Register your models here.
from account.models import Room, message, Profile
admin.site.register(Room)
admin.site.register(message)
admin.site.register(Profile)