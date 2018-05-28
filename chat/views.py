from django.shortcuts import render
from django.utils.safestring import mark_safe
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
import json
import datetime
from account.models import Room, message
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
    timestamp = datetime.datetime.now()
    m_input = ""

    # if 'message_input' in request.POST:
    #     m_input = request.POST.get("message_input")

    #     m = message.objects.create(room=rooM,owner=str(username),content=m_input)
    #     m.save()
    # else:
    #     m_input = False

    return render(request, 'chat/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name)),
        'name_json': mark_safe(json.dumps(username)),
        'time_json': mark_safe(json.dumps(timestamp, default = myconverter)),
        'message':mes,
        'm_input':m_input,
    })