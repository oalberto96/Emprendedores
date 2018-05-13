from django.db import models

from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
	class Meta:
		permissions = (
			('create_product','Create product'),
			('read_product','Read product'),
			('update_product','Update product'),
			('delete_product','Delete product'),
			('list_product','List product')
			)