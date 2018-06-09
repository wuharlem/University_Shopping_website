from __future__ import unicode_literals
import uuid
from django.db import models
from django.utils import timezone
from croppie.fields import CroppieField
from django import forms

class AddForm(forms.Form):
    photo = CroppieField()

class Commodity(models.Model):
	owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)
	name = models.CharField(max_length = 20, default = "")
	price = models.DecimalField(max_digits = 5, decimal_places = 0)
	number = models.IntegerField(default = 1)
	status = models.CharField(max_length = 20, default = "")
	introduction = models.TextField(max_length = 300)


	SHOPPING_CHOICES = (
        ('CP', '電腦 , 手機 , 電子周邊'),
        ('FN', '家電 , 家具'),
        ('TR', '交通工具'),
        ('TF', '玩具 , 公仔 , 電玩'),
        ('HB', '生活居家'),
        ('CL', '服飾'),
        ('AC', '飾品 , 配件'),
        ('FD', '食品'),
        ('CS', '保養 , 彩妝'),
        ('BK', '書籍'),
        ('MM', '音樂 , 電影 , 文創'),
        ('HS', '租屋'),
        ('SP', '運動'),
        ('OT', '其他'),
    )
	type = models.CharField(max_length = 2, choices = SHOPPING_CHOICES, default = 'CP')

	img = models.ImageField(upload_to='images', default='/images/9.png' )

	def __str__(self):
		return "%s  %s"%(self.owner,  self.name)

	def publish(self):
		self.save()

class Post(models.Model): #Post has Commodity
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	commodity = models.OneToOneField('Commodity', on_delete=models.CASCADE)

	created_date = models.DateTimeField(
    	default=timezone.now)

	published_date = models.DateTimeField(
    	blank=True, null=True)

	edited_date = models.DateTimeField(
    	blank=True, null=True)

	def publish(self):
		self.published_date = timezone.now()
		self.save()
	
	def __str__(self):
		return "%s posts %s"%(self.commodity.owner, self.commodity.name)

class comment(models.Model):
	post = models.OneToOneField('Post', on_delete=models.CASCADE)
	# comment_user = post.author
	author = models.CharField(max_length = 20)
	content = models.CharField(max_length = 20)

	created_time = models.DateTimeField(
            default=timezone.now)

	edit_date = models.DateTimeField(
            blank=True, null=True)

	def __str__(self):
		return "%s comments %s at %s"%(self.author, self.content, self.created_time)

class rank(models.Model):
	post = models.OneToOneField('Post', on_delete=models.CASCADE)
	author = models.CharField(max_length = 20)

	created_time = models.DateTimeField(
            default=timezone.now)

	def __str__(self):
		return "%s ranks %s"%(self.author, self.post)