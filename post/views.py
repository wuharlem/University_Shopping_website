from django.shortcuts import render, render_to_response, get_object_or_404
from django.http import HttpResponseRedirect

from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm


from django.contrib.auth.models import User
from .models import Commodity, Post, comment, rank
from account.models import Profile

"""
1. Get login User
username = request.user.username

2. Check if object exists.
get_object_or_404(object, attribute)
if true return the object else return 404

"""

@login_required
def mainpage(request):
	username = request.user.username
	article = Post.objects.all()
	return HttpResponseRedirect("/type/ALL/1/")

@login_required
def index(request, production_type, page_num):
	username = str(request.user.username)
	page_num = int(page_num)

	# get all articles
	article = Post.objects.all() 

	# the article list we want
	article_list = []

	'''
	Phrase1: Get the article filtered by the chosen production_type.
	'''
	if production_type == "ALL": 
		article_list = article

	else:
		article_list = [article[num] for num in range(0, len(article)) 
		if article[num].commodity.type == production_type]
		

	'''
	Phrase2: Divide article_list into pages.
	'''

	#length of article_list
	l = len(article_list)

	if(int(l%12) == 0): l = l-1 #avoid adding more page as l%12 == 0

	page_total_num = [ num for num in range(1, ((int(l/12))+1)+1) ] #list of page_number

	if l > (page_num-1)*12 : #check if page exist
		if l <= (page_num)*12:
			article_list = [(article_list[num], (num+1)%4) for num in range((page_num-1)*12, len(article_list))]
		else:
			article_list = [(article_list[num], (num+1)%4) for num in range((page_num-1)*12, page_num*12)]
	else:
		return HttpResponseRedirect("/")

	return render(request, "post/index.html", locals())

@login_required
def post(request):
	username = request.user.username

	if request.method == "POST":
		name = request.POST["name"] # -> post's commodity's name
		price = request.POST["price"] # -> post's commodity's price
		status = request.POST["status"] # -> post's commodity's status
		number = request.POST["number"] # -> post's commodity's number
		intro = request.POST["intro"] # -> post's commodity's introduction

		if request.FILES['picture']:
			picture = request.FILES['myfile']


		return HttpResponseRedirect("/")
	else:
		return render(request, 'post/post.html', locals())

@login_required
def commodity(request, article_id):
	username = request.user.username
	get_object_or_404(Post, pk = article_id)

	article = Post.objects.get(pk = article_id)
	production = article.commodity

	"""
	Phrase1: Check if the Login User has the authentication 
			 to edit Post.
	"""
	if str(production.owner) == str(username):
		editable = True
	else:
		editable = False

	"""
	Phrase2: Check if the Login User click rank button.
	"""	
	if "rank" in request.POST:
		return HttpResponseRedirect("/commodity/"+ str(article_id)+"/")

		"""
	Phrase3: Edit the post if it has POST request.
	"""		
	
	elif request.method == "POST":
		name = request.POST["name"] # -> post's commodity's name
		price = request.POST["price"] # -> post's commodity's price
		status = request.POST["status"] # -> post's commodity's status
		number = request.POST["number"] # -> post's commodity's number
		intro = request.POST["intro"] # -> post's commodity's introduction
		'''
		TODO list 2
		Just assign the value to model and MUST save().
		'''		
		return HttpResponseRedirect("/commodity/"+ str(article_id)+"/")

	else:
		return render(request, 'post/commodity.html', locals())

@login_required
def profile(request, user_name):
	username = request.user.username
	user_name = get_object_or_404(User, username = user_name)

	"""
	Phrase1: Check if the Login User has profile.
			 If ture do getting the profile else create one.
	"""
	if not Profile.objects.filter(user = user_name):
		Profile.objects.create(user = User.objects.get(username = user_name))

	profile = Profile.objects.get(user = User.objects.get(username = user_name))

	"""
	Phrase2: Check if the Login User has the authentication 
			 to edit user_name'sprofile.
	"""

	if str(username) == str(user_name):
		editable = True
	else:
		editable = False

	"""
	Phrase3: Edit the profile if it has POST request.
	"""

	if request.method == "POST":
		email = request.POST["email"] # -> User's email
		intro = request.POST["intro"] # -> User's profile's introduction
		'''
		TODO list 3
		Just assign the value to model and MUST save().
		'''
		return HttpResponseRedirect('/profile/'+str(user_name)+"/")
	else:	
		return render(request, 'post/profile.html', locals())