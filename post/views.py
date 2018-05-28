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
	return HttpResponseRedirect("/type/ALL/1/")

@login_required
def index(request, production_type, page_num):
	username = str(request.user.username)
	page_num = int(page_num)
	article = Post.objects.all()

	if production_type == "ALL":
		article_list = article
	else:
		article_list = [ article[num] for num in range(0, len(article)) 
		if article[num].commodity.type == production_type ]
		
	l = len(article_list) #length of article_list

	if(int(l%12) == 0): l = l-1 #avoid adding more page as l%12 == 0

	page_total_num = [ num for num in range(1, ((int(l/12))+1)+1) ] #list of page_number

	if l > (page_num-1)*12 : #to check if page exist
		if l <= (page_num)*12:
			article_list = [(article_list[num], (num+1)%4) for num in range((page_num-1)*12, len(article_list))]
		else:
			article_list = [(article_list[num], (num+1)%4) for num in range((page_num-1)*12, page_num*12)]
	else:
		return HttpResponseRedirect("/") #or return /

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

@login_required
def profile_update(request, user_name):
	user_name = get_object_or_404(User, username = user_name)
	return render(request, 'post/edit_about_me.html', locals())
# def error_404(request):
#         data = {}
#         return render(request,'404.html', data)