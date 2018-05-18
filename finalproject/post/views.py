from django.shortcuts import render, render_to_response, get_object_or_404
from django.http import HttpResponseRedirect

from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm

from django.contrib.auth.models import User
from .models import Commodity, Post, comment, rank


@login_required
def mainpage(request):
	username = request.user.username
	article = Post.objects.all()
	return HttpResponseRedirect("/type/CP/")

@login_required
def index(request, production_type):
	p_type = production_type
	username = str(request.user.username)
	article = Post.objects.all()

	if "search" in request.GET:
		s = request.GET["search"]
	else:
		s = None
	return render(request, "post/index.html", locals())

@login_required
def post(request):
	username = request.user.username
	return render(request, 'post/post.html', locals())

@login_required
def commodity(request, article_id):
	username = request.user.username
	get_object_or_404(Post, pk = article_id)
	article = Post.objects.get(pk = article_id)
	production = article.commodity
	web = "/commodity/"+ str(article_id)+"/"

	if "rank" in request.POST:
		return HttpResponseRedirect(web)

	else:
		return render(request, 'post/commodity.html', locals())

@login_required
def profile(request, user_name):
	user_name = get_object_or_404(User, username = user_name)
	return render(request, 'post/profile.html', locals())


# def error_404(request):
#         data = {}
#         return render(request,'404.html', data)