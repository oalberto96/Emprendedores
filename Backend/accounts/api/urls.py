from django.conf.urls import url
from django.views.generic.base import RedirectView

from accounts.api.views import LoginUserAPI, RegisterUserAPI


urlpatterns = [
	url(r'^login/$',LoginUserAPI.as_view(), name='login'),
	url(r'^register/$',RegisterUserAPI.as_view(), name='register')
]