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
def manage(request, page_num):
	username = str(request.user.username)
	page_num = int(page_num)
	article = Post.objects.all()

	article_list = [article[num] for num in range(0, len(article)) if str(article[num].commodity.owner) == username]

	l = len(article_list) #length of article_list

	if(int(l%12) == 0): l = l-1 #avoid adding more page as l%12 == 0

	page_total_num = [ num for num in range(1, ((int(l/12))+1)+1) ]

	if len(article_list) > (page_num-1)*12 :
		if len(article_list) <= (page_num)*12:
			article_list = [(article_list[num], (num+1)%4) for num in range((page_num-1)*12, len(article_list))]
		else:
			article_list = [(article_list[num], (num+1)%4) for num in range((page_num-1)*12, page_num*12)]
	else:
		return HttpResponseRedirect("/account/1/")
	return render(request, 'post/my_store.html', locals())

