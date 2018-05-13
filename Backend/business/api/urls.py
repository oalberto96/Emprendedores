from django.conf.urls import url
from business.api.views import business_register

urlpatterns = [
	url(r'^$',business_register, name='check'),
]