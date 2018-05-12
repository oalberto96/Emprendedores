from django.db import models
from django.conf import settings


# Create your models here.

class Client(models.Model):
	id_user = models.ForeignKey(settings.AUTH_USER_MODEL)
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
	id_user = models.ForeignKey(settings.AUTH_USER_MODEL)
	name_product = models.CharField(max_length=130)
	price = models.FloatField()
	sku = models.CharField(max_length=30)
	comment = models.CharField(max_length=130)

	def __str__(self):
		return str(self.name_product)

class SaleManager(models.Manager):
	def with_products(self, sale_owner):
		queryset = Sale.objects.filter(id_user = sale_owner)
		for sale in queryset:
			sale.products = [{sale_product.product.id: sale_product.quantity for sale_product in SaleProduct.objects.filter(id_sale = sale.id)}]
		return queryset

	def get(self, id):
		sale = Sale.objects.get(id=id)
		products = []
		for sale_product in SaleProduct.objects.filter(id_sale = sale.id):
			product = {}
			product['id_user'] = sale_product.product.id_user.id
			product['name_product'] = sale_product.product.name_product
			product['price'] = sale_product.product.price
			product['sku'] = sale_product.product.sku
			product['comment'] = sale_product.product.comment
			product['quantity'] = sale_product.quantity
			products.append(product)
		sale.products = products
		return sale

class Sale(models.Model):
	id_user = models.ForeignKey(settings.AUTH_USER_MODEL)
	id_client = models.ForeignKey(Client)
	date = models.DateTimeField (auto_now=False)
	discount = models.FloatField()
	subtotal = models.FloatField()
	pay_type = models.CharField(max_length=30)
	total = models.FloatField()
	finished = models.BooleanField()

	objects = models.Manager()
	rel_objects = SaleManager() #Relational queries
	products = []

	def __str__(self):
		return str(self.id) + " " + str(self.total)


class SaleProduct(models.Model):
	id_sale = models.ForeignKey(Sale)
	product = models.ForeignKey(Product)
	quantity = models.FloatField()

	def __str__(self):
		return "id: " + str(self.id_sale) + " " + str(self.product) + " " + str(self.quantity) 


class Pay(models.Model):
	id_sale = models.ForeignKey(Sale)
	amount = models.FloatField()