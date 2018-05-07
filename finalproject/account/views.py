from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect

from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm

@login_required
def index(request):
	return render(request, "post/index.html", locals())

def create(request):
	return render(request, "account/create.html", locals())


def register(request):
	if request.method == 'POST':
		form = UserCreationForm(request.POST)
		if form.is_valid():
			user = form.save()
			return HttpResponseRedirect('/account/login/')
		else:
			form = UserCreationForm()
	return render(request, 'account/register.html',locals())