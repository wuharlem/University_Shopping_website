from django.shortcuts import render
from django.utils.safestring import mark_safe
from django.contrib.auth.decorators import login_required
import json
import datetime


def myconverter(o):
    if isinstance(o, datetime.datetime):
        return "{}/{} {}:{}:{}".format(o.month, o.day, o.hour, o.minute, o.second)
 
# Create your views here.
@login_required
def index(request):
	username = request.user.username
	return render(request, 'chat/index.html', locals())

@login_required
def room(request, room_name):
	username = request.user.username
	timestamp = datetime.datetime.now()
	return render(request, 'chat/room.html', {
    	'room_name_json': mark_safe(json.dumps(room_name)),
    	'name_json': mark_safe(json.dumps(username)),
    	'time_json': mark_safe(json.dumps(timestamp, default = myconverter)),
    })