from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from business.models import Business

from sales.models import Product, Sale, Client
from sales.api.serializers import ProductSerializer

@api_view(['POST'])
def business_register(request, pk=None):
	if request.method == 'POST':
		if Business.objects.filter(user=request.user).exists():
			return Response(status=status.HTTP_409_CONFLICT)
		else:
			name = request.data.get('name')
			description = request.data.get('description')
			url = request.data.get('url')
			business = Business(name=name, description=description, user=request.user, url=url)
			business.save()
			return Response(status=status.HTTP_200_OK)

@api_view()
def business_get_info(request, business_url=None):
	business = Business.objects.filter(url=business_url)
	if len(business) > 0:
		response = {}
		response['name'] = business[0].name 
		response['description'] = business[0].description
		return Response(response, status=status.HTTP_200_OK)
	else:
		return Response(status=status.HTTP_404_NOT_FOUND)

@api_view()
def business_get_products(request, business_url=None):
	business = Business.objects.filter(url=business_url)
	business_owner = business[0].user
	queryset = Product.objects.filter(id_user=business_owner.id)
	serializer = ProductSerializer(queryset, many=True)
	return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def business_sale(request, business_url=None):
	if request.method == "POST":
		if not request.user.is_anonymous:
			business = Business.objects.filter(url=business_url)
			business_owner = business[0].user
			sale = Sale()
			sale.id_user = business_owner
			sale.id_client = Client.objects.filter(id=1)[0] # TODO
			sale.date = request.data.get('date')
			sale.discount = request.data.get('discount')
			sale.subtotal = request.data.get('subtotal')
			sale.pay_type = request.data.get('pay_type')
			sale.total = request.data.get('total')
			sale.finished = request.data.get('finished')
			sale.save()
			return Response(status=status.HTTP_200_OK)
		else:
			return Response(status=status.HTTP_401_UNAUTHORIZED)
	else:
		return Response(status=status.HTTP_404_NOT_FOUND)