from django.conf.urls import url
from business.api.views import *
#(([a-z]+|\-)+)
urlpatterns = [
	url(r'^$',business_register, name='check'),
	url(r'^(?P<business_url>([a-z]+|\-)+)$',business_get_info, name='get-info'),
	url(r'^(?P<business_url>([a-z]+|\-)+)/products$',business_get_products, name='get-info'),
	url(r'^(?P<business_url>([a-z]+|\-)+)/sale$',business_sale, name='get-info'),
	url(r'^(?P<business_url>([a-z]+|\-)+)/client$',business_client_register, name='register-client'),
]