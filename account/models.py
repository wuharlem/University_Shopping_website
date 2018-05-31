from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Profile(models.Model): #User has Profile
	user = models.OneToOneField(User, on_delete=models.CASCADE)

	SCHOOL_CHOICES = (
        ('NTU', 'National Taiwan University'),
        ('NTNU', 'National Taiwan Normal University'),
        ('NTUST', 'National Taiwan University of Science and Technology'),
    )

	school = models.CharField(max_length=5, choices = SCHOOL_CHOICES, default='NTUST')
	picture = models.ImageField(upload_to='images', default='/images/9.png' )
	room = models.ManyToManyField('Room')
	introduction = models.TextField(max_length = 300, default="About me.")

	def publish(self):
		self.save()

	def __str__(self):
		return "%s"%(self.user)

class Room(models.Model):
	owner = models.ManyToManyField('auth.User')

	def __str__(self):
		return "%s and %s"%(self.owner.all()[0], self.owner.all()[1])

class message(models.Model):
	room = models.ForeignKey('Room', on_delete=models.CASCADE)
	owner = models.CharField(max_length = 20, default = "")
	content = models.TextField()
	timestamp = models.DateTimeField(
    	default=timezone.now)

	def __str__(self):
		return "%s in %s'room send [%s] at %s"%(
			self.owner,  self.room, self.content, self.timestamp)