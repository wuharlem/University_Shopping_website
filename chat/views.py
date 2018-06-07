from django.shortcuts import render
from django.utils.safestring import mark_safe
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
import json
import datetime
from account.models import Room, message, Profile
from django.contrib.auth.models import User


def myconverter(o):
    if isinstance(o, datetime.datetime):
        return "{}/{} {}:{}:{}".format(o.month, o.day, o.hour, o.minute, o.second)

# Create your views here.
@login_required
def index(request):
    username = request.user.username
    room = Room.objects.all()
    room = [r for r in room if r.owner.filter(username = username)]
    room_name = []
    for r in room:
        for u in r.owner.all():
            if u.username != str(username):
                room_name.append((u, r))

    return render(request, 'chat/index.html', locals())
    
@login_required
def room(request, room_name):
    Id = int(room_name)
    rooM = Room.objects.get(id = Id)
    mes = message.objects.filter(room = rooM)
    username = request.user.username
    chat_person = ""
    for n in rooM.owner.all():
        if n.username != str(username):
            chat_person = n.username
    timestamp = datetime.datetime.now()
    profile = Profile.objects.get(user = User.objects.get(username=chat_person))


    return render(request, 'chat/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name)),
        'name_json': mark_safe(json.dumps(username)),
        'time_json': mark_safe(json.dumps(timestamp, default = myconverter)),
        'message':mes,
        'chat_person':chat_person,
        'user':str(username),
        'profile':profile,
        'username':username,
    })