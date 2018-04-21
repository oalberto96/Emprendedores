from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Client(models.Model):
	id_user = models.ForeignKey(User)
	first_name = models.CharField(max_length=130)
	last_name = models.CharField(max_length=130, null=True)
	email = models.EmailField(null=True)
	phone_number = models.CharField(max_length=30,null=True)
	address = models.CharField(max_length=320, null=True)
	rfc = models.CharField(max_length=100, null=True)
	notes = models.CharField(max_length=300, null=True)

	def __str__(self):
		return str(self.first_name) + " " + str(self.last_name)
