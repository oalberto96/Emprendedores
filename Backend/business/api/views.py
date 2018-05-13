from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from business.models import Business

from sales.models import Product
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