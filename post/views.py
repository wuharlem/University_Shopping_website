from django.shortcuts import render, render_to_response, get_object_or_404
from django.http import HttpResponseRedirect

from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.core.files.storage import FileSystemStorage


from django.contrib.auth.models import User
from account.models import Room, message, Profile
from .models import Commodity, Post, comment, ranker

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
	profile = Profile.objects.get(user = User.objects.get(username=username))
	article = Post.objects.all()

	return HttpResponseRedirect("/type/ALL/1/")

@login_required
def index(request, production_type, page_num):
	username = str(request.user.username)
	page_num = int(page_num)
	profile = Profile.objects.get(user = User.objects.get(username=username))

	# get all articles
	article = Post.objects.all() 

	# the article list we want
	article_list = []

	'''
	Phrase1: Get the article filtered by the chosen production_type.
	'''

	if "search" in request.GET:
		n = request.GET["search"]
		article_list = [article[num] for num in range(0, len(article)) 
		if n in article[num].commodity.name]

		l = len(article_list)

		if(int(l%100) == 0): l = l-1 #avoid adding more page as l%12 == 0

		page_total_num = [ num for num in range(1, ((int(l/100))+1)+1) ] #list of page_number

		if l > (page_num-1)*100 : #check if page exist
			if l <= (page_num)*100:
				article_list = [(article_list[num], (num+1)%4) for num in range((page_num-1)*100, len(article_list))]
			else:
				article_list = [(article_list[num], (num+1)%4) for num in range((page_num-1)*100, page_num*100)]
		else:
			return render(request, "post/index.html", locals())

		return render(request, "post/index.html", locals())


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

	if(int(l%100) == 0): l = l-1 #avoid adding more page as l%12 == 0

	page_total_num = [ num for num in range(1, ((int(l/100))+1)+1) ] #list of page_number

	if l > (page_num-1)*100 : #check if page exist
		if l <= (page_num)*100:
			article_list = [(article_list[num], (num+1)%4) for num in range((page_num-1)*100, len(article_list))]
		else:
			article_list = [(article_list[num], (num+1)%4) for num in range((page_num-1)*100, page_num*100)]
	else:
		return HttpResponseRedirect("/")

	return render(request, "post/index.html", locals())

@login_required
def post(request):
	username = str(request.user.username)
	profile = Profile.objects.get(user = User.objects.get(username=username))
	commodity = Commodity.objects.all()[0]

	if request.method == "POST":
		name = request.POST["name"] # -> post's commodity's name
		price = request.POST["price"] # -> post's commodity's price
		status = request.POST["status"] # -> post's commodity's status
		number = request.POST["number"] # -> post's commodity's number
		intro = request.POST["intro"] # -> post's commodity's introduction
		tp = request.POST["tp"]

		if 'picture' in request.FILES:
			picture = request.FILES['picture']
			fs = FileSystemStorage()
			filename = fs.save(picture.name, picture)

		commodity_info = Commodity.objects.create(owner=User.objects.get(username=username), name=name,
			price=price, status=status, number=number, introduction=intro, img=fs.url(filename), type =tp)

		new_post = Post.objects.create(commodity=commodity_info)
		new_post.publish()
		return HttpResponseRedirect("/")
	else:
		return render(request, 'post/post.html', locals())

@login_required
def commodity(request, article_id):
	get_object_or_404(Post, pk = article_id)

	username = request.user.username
	profile = Profile.objects.get(user = User.objects.get(username=username))

	article = Post.objects.get(pk = article_id)
	production = article.commodity
	seller = production.owner
	ranker_list = []
	rankable = "True"
	if article.Ranker:
		for a_r in article.Ranker.all()[0:5]:
			if str(a_r.author)==str(username):
				rank_id = a_r.id
				rankable = "False"
			ranker_list.append(Profile.objects.get(user = User.objects.get(username=a_r.author)))



	room = Room.objects.all()
	room = [r for r in room if r.owner.filter(username = username)]
	chatroom = False
	for r in room:
		for u in r.owner.all():
			if u.username == str(seller):
				chatroom = r

	if not chatroom:
		chatroom = Room()
		chatroom.save()
		chatroom.owner.add(User.objects.get(username=username))
		chatroom.save()
		chatroom.owner.add(User.objects.get(username=str(seller)))
		chatroom.save()

	"""
	Phrase1: Check if the Login User has the authentication 
			 to edit Post.
	"""
	if str(production.owner) == str(username):
		editable = True
	else:
		editable = False

	"""
	Phrase3: Edit the post if it has POST request.
	"""		


	if "rank" in request.POST and not editable and rankable=="True":
		profile.cart.add(Commodity.objects.get(id=request.POST['rank']))
		profile.save()

		rk = ranker.objects.create(author = str(User.objects.get(username=username)))
		article.Ranker.add(rk)
		article.save()
		rankable = "False"
		return HttpResponseRedirect("/commodity/"+ str(article_id)+"/")

	if "rank" in request.POST and not editable and rankable=="False":
		profile.cart.remove(Commodity.objects.get(id=request.POST['rank']))
		profile.save()
		rank_del = ranker.objects.get(id=rank_id)
		article.Ranker.remove(rank_del)
		article.save()
		rank_del.delete()
		rankable = "True"
		return HttpResponseRedirect("/commodity/"+ str(article_id)+"/")

	if "finish" in request.POST:
		if article.Ranker:
			for a_r in article.Ranker.all():
				a_r.delete()
		
		production.delete()	

		return HttpResponseRedirect("/")

	if "name" in request.POST:

		name = request.POST["name"] # -> post's commodity's name
		price = request.POST["price"] # -> post's commodity's price
		status = request.POST["status"] # -> post's commodity's status
		number = request.POST["number"] # -> post's commodity's number
		intro = request.POST["intro"] # -> post's commodity's introduction
		tp = request.POST["tp"]
		
		if 'picture' in request.FILES:
			picture = request.FILES['picture']
			fs = FileSystemStorage()
			filename = fs.save(picture.name, picture)
			production.img = fs.url(filename)
		'''
		TODO list 2
		Just assign the value to model and MUST save().
		'''		
		production.name = name
		production.price = price
		production.status = status
		production.number = number
		production.introduction = intro
		production.type = tp
		production.save()

		article.edit()

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
	# if not Profile.objects.filter(user = user_name):
	# 	Profile.objects.create(user = User.objects.get(username = user_name))

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
		school = request.POST["school"]
		if 'picture' in request.FILES:
			picture = request.FILES['picture']
			fs = FileSystemStorage()
			filename = fs.save(picture.name, picture)
			profile.picture = fs.url(filename)
			
		'''
		TODO list 3
		Just assign the value to model and MUST save().
		'''
		profile.user.email = email
		profile.introduction = intro
		profile.school = school
		profile.user.save()
		profile.save()

		return HttpResponseRedirect('/profile/'+str(user_name)+"/")
	else:	
		return render(request, 'post/profile.html', locals())


