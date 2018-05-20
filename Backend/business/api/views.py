from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from business.models import *

from sales.models import Product, Sale, Client, SaleProduct
from sales.api.serializers import ProductSerializer
from accounts.models import User
from accounts.api.views import LoginUserAPI

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
			business = Business.objects.filter(url=business_url).first()
			if not business:
				return Response(status=status.HTTP_400_BAD_REQUEST)
			business_owner = business.user
			user = User.objects.get(id=request.user.id)
			client_user_query = ClientUser.objects.filter(user=user)
			for client_user in client_user_query:
				if client_user.client.id_user == business_owner:
					client = client_user.client
			sale = Sale()
			sale.id_user = business_owner
			sale.id_client = client
			sale.date = request.data.get('date')
			sale.discount = request.data.get('discount')
			sale.subtotal = request.data.get('subtotal')
			sale.pay_type = request.data.get('pay_type')
			sale.total = request.data.get('total')
			sale.finished = request.data.get('finished')
			sale.save()
			products = request.data.get('products')
			for product_request in products:
				product = Product.objects.get(id=product_request.get('id_product'))
				SaleProduct.objects.create(
					id_sale=sale,
					product=product,
					quantity=product_request.get('quantity'))
			return Response(status=status.HTTP_200_OK)
		else:
			return Response(status=status.HTTP_401_UNAUTHORIZED)
	else:
		return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def business_client_register(request, business_url=None):
	if request.method == "POST":
		business_owner = Business.objects.filter(url=business_url)[0].user
		if business_owner:
			'''
			if user exist
				find if is a client
				if is client
					do nothing
				else
					make new client
			if doesnt exist
				create new user
				asociate to a new client
				return cookies
			'''
			users_query = User.objects.filter(username=request.data.get('email'))
			if len(users_query) > 0:
				user = users_query[0]
				client_user_queryset = ClientUser.objects.filter(user=user)
				if len(client_user_queryset) > 0:
					for client_user in client_user_queryset:
						if client_user.client.id_user == business_owner:
							#Can't register, user already exist
							return Response(status=status.HTTP_409_CONFLICT)
				else:
					client = Client(
						id_user = business_owner,
						first_name = request.data.get('first_name'),
						last_name = request.data.get('last_name'),
						email = request.data.get('email'),
						phone_number = request.data.get('phone_number'),
						address = request.data.get('address'),
						rfc = request.data.get('rfc'),
						notes = ""
						)
					client.save()
					new_client_user = ClientUser(user=user, client=client)
					new_client_user.save()
					request.data['username'] = request.data.get('email')
					logUser = LoginUserAPI()
					return logUser.post(request)
			else:
				#Create a new user
				user = User.objects.create_user(
					username=request.data.get('email'),
					password=request.data.get('password'),
					email=request.data.get('email'),
					first_name=request.data.get('first_name'),
					last_name=request.data.get('last_name'))
				client = Client(
					id_user=business_owner,
					first_name=request.data.get('first_name'),
					last_name=request.data.get('last_name'),
					email=request.data.get('email'),
					phone_number=request.data.get('phone_number'),
					address=request.data.get('address'),
					rfc=request.data.get('rfc'),
					notes="")
				client.save()
				# Asociate to a new client
				request.data['username'] = request.data.get('email')
				ClientUser.objects.create(user=user, client=client)
				logUser = LoginUserAPI()
				return logUser.post(request)
		else:
			return Response(status=status.HTTP_404_NOT_FOUND)

		return Response(status=status.HTTP_200_OK)
	else:
		return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def business_client_login(request, business_url=None):
	if request.method == "POST":
		user = User.objects.filter(username=request.data.get('username')).first()
		business = Business.objects.filter(url=business_url).first()
		if user and business:
			business_owner = business.user
			client_user_query = ClientUser.objects.filter(user=user)
			for client_user in client_user_query:
				if client_user.client.id_user == business_owner:
					logUser = LoginUserAPI()
					return logUser.post(request)
		return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
	return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)