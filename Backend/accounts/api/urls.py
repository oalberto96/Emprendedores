from django.conf.urls import url
from django.views.generic.base import RedirectView

from accounts.api.views import UserAPILogin


urlpatterns = [
	url(r'^login/$',UserAPILogin.as_view(), name='login')
]