from django.conf.urls import url

from sales.api.views import ClientViewSet, ProductViewSet


urlpatterns = [
	url(r'^clients$',ClientViewSet.as_view({'get':'list','post':'create'}), name='client-list'),
	url(r'^clients/(?P<pk>\d+)$',ClientViewSet.as_view({'get':'retrieve','delete':'destroy'}), name='client-list'),
	url(r'^products$',ProductViewSet.as_view({'get':'list'}), name='product'),
]