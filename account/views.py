from django.shortcuts import render, render_to_response, get_object_or_404
from django.http import HttpResponseRedirect

from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm

from django.contrib.auth.models import User
from post.models import Commodity, Post, comment, rank


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


@login_required
def manage(request):
	username = request.user.username
	article = Post.objects.all()
	return render(request, 'post/my_store.html', locals())




# def error_404(request):
#         data = {}
#         return render(request,'404.html', data)