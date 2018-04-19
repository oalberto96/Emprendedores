from django.conf.urls import url

from sales.api.views import ClientViewSet
# from sales.api.views import LoginUserAPI, RegisterUserAPI


urlpatterns = [
	url(r'^list/$',ClientViewSet.as_view({'get':'list'}), name='client-list'),
]