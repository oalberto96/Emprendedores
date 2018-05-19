from django.db import models
from django.conf import settings

from sales.models import Client

# Create your models here.
class Business(models.Model):
	user = models.OneToOneField(settings.AUTH_USER_MODEL)
	name = models.CharField(max_length=50)
	url = models.CharField(max_length=50)
	description = models.CharField(max_length=250, null=True)

	def __str__(self):
		return str(self.user) + ": " + str(self.name)

class ClientUser(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL)
	client = models.OneToOneField(Client)
