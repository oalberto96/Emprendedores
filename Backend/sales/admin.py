from django.contrib import admin
from sales.models import Client, Product, Sale, Pay
# Register your models here.
admin.site.register(Client)
admin.site.register(Product)
admin.site.register(Sale)
admin.site.register(Pay)