from django.conf.urls import url

from sales.api.views import ClientViewSet, ProductViewSet, SaleViewSet


urlpatterns = [
	url(r'^clients$',ClientViewSet.as_view({'get':'list','post':'create'}), name='client-list'),
	url(r'^clients/(?P<pk>\d+)$',ClientViewSet.as_view({'get':'retrieve','delete':'destroy','put':'update'}), name='client-list'),
	url(r'^products$',ProductViewSet.as_view({'get':'list','post':'create'}), name='product-list'),
	url(r'^products/(?P<pk>\d+)$',ProductViewSet.as_view({'get':'retrieve','delete':'destroy','put':'update'}), name='product-list'),
	url(r'^sales$',SaleViewSet.as_view({'post':'create'}), name='sales'),
]