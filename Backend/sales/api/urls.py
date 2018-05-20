from django.conf.urls import url

from sales.api.views import ClientViewSet, ProductViewSet, SaleViewSet, SaleReportViewSet,DataViewSet


urlpatterns = [
	url(r'^clients$',ClientViewSet.as_view({'get':'list','post':'create'}), name='client-list'),
	url(r'^clients/(?P<pk>\d+)$',ClientViewSet.as_view({'get':'retrieve','delete':'destroy','put':'update'}), name='client-list'),
	url(r'^products$',ProductViewSet.as_view({'get':'list','post':'create'}), name='product-list'),
	url(r'^products/(?P<pk>\d+)$',ProductViewSet.as_view({'get':'retrieve','delete':'destroy','put':'update'}), name='product-list'),
	url(r'^report/$',SaleReportViewSet.as_view(), name='report-list'),
	url(r'^data/$',DataViewSet.as_view(), name='data-list'),
	url(r'^sales$',SaleViewSet.as_view({'post':'create', 'get':'list'}), name='sales'),
	url(r'^sales/(?P<pk>\d+)$',SaleViewSet.as_view({'get':'retrieve'}), name='sales'),
]