from django.conf.urls import url
from django.views.generic.base import RedirectView

from accounts.api.views import LoginUserAPI, RegisterUserAPI, ServiceUserAPI, buy_service, User, Logout


urlpatterns = [
	url(r'^login/$',LoginUserAPI.as_view(), name='login'),
	url(r'^register/$',RegisterUserAPI.as_view(), name='register'),
	url(r'^service/check$',ServiceUserAPI.as_view(), name='check'),
	url(r'^service/buy/(?P<pk>[1-3]+)$',buy_service, name='check'),
	url(r'^user$',User.as_view(), name='user'),
	url(r'^logout/$',Logout.as_view(), name='logout'),
]