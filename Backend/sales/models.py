from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Client(models.Model):
	id_user = models.ForeignKey(User)
	first_name = models.CharField(max_length=130)
	last_name = models.CharField(max_length=130)
	email = models.EmailField()
	phone_number = models.CharField(max_length=30)
	address = models.CharField(max_length=320)
	rfc = models.CharField(max_length=100)
	notes = models.CharField(max_length=300)

	def __str__(self):
		return str(self.first_name) + " " + str(self.last_name)


class Product (models.Model):
	id_user = models.ForeignKey(User)
	name_product = models.CharField(max_length=130)
	price = models.FloatField()
	sku = models.CharField(max_length=30)
	comment = models.CharField(max_length=130)

	def __str__(self):
		return str(self.name_product)


class Sale(models.Model):
	id_user = models.ForeignKey(User)
	id_client = models.ForeignKey(Client)
	id_product = models.ForeignKey(Product)
	date = models.DateTimeField (auto_now=False)
	discount = models.FloatField()
	subtotal = models.FloatField()
	pay_type = models.CharField(max_length=30)
	total = models.FloatField()
	finished = models.BooleanField()

class Pay(models.Model):
	id_sale = models.ForeignKey(Sale)
	amount = models.FloatField()