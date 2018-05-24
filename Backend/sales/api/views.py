from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.db.models import Sum
from django.contrib.auth.models import User
from django.utils.timezone import datetime #important if using timezones
from sales.api.serializers import ClientSerializer, ProductSerializer, SaleSerializer
from sales.models import Client, Product, Sale

class ClientViewSet(viewsets.ViewSet):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = ClientSerializer

	def create(self, request):
		request.data['id_user'] = str(request.user.id) #TODO: Mejorar implementacion
		serializer = ClientSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

	def retrieve(self, request, pk=None):
		group_required = ['ulevel0']
		clients = Client.objects.filter(id=pk)
		if clients:
			serializer = ClientSerializer(clients.first())
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_404_NOT_FOUND)

	def update(self, request, pk=None):
		queryset = Client.objects.filter(id=pk)
		request.data['id_user'] = str(request.user.id)
		serializer = ClientSerializer(queryset.first(), request.data, many=False)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
		print(serializer.data)
		return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

	def destroy(self, request, pk=None):
		clients = Client.objects.filter(id=pk)
		if clients:
			clients.first().delete()
			return Response(status=status.HTTP_204_NO_CONTENT)
		return Response(status=status.HTTP_404_NOT_FOUND)

	def list(self, request):
		queryset = Client.objects.filter(id_user=request.user.id)
		serializer = ClientSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)


class ProductViewSet(viewsets.ViewSet):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = ProductSerializer

	def list(self, request):
		queryset = Product.objects.filter(id_user=request.user.id)
		serializer = ProductSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def create(self, request):
		request.data['id_user'] = str(request.user.id) #TODO: Mejorar implementacion
		serializer = ProductSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_404_NOT_FOUND)

	def retrieve(self, request, pk=None):
		products = Product.objects.filter(id=pk)
		if products:
			serializer = ProductSerializer(products.first())
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_404_NOT_FOUND)

	def update(self, request, pk=None):
		queryset = Product.objects.filter(id=pk)
		request.data['id_user'] = str(request.user.id)
		serializer = ProductSerializer(queryset.first(), request.data, many=False)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
		print(serializer.data)
		return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

	def destroy(self, request, pk=None):
		products = Product.objects.filter(id=pk)
		if products:
			products.first().delete()
			return Response(status=status.HTTP_204_NO_CONTENT)
		return Response(status=status.HTTP_404_NOT_FOUND)
	
	def list(self, request):
		queryset = Product.objects.filter(id_user=request.user.id)
		serializer = ProductSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

class SaleViewSet(viewsets.ViewSet):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = SaleSerializer

	def create(self, request):
		print(request.user)
		request.data['id_user'] = str(request.user.id) #TODO: Mejorar implementacion
		serializer = SaleSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		else:
			return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

	def retrieve(self, request, pk=None):
		sale = Sale.rel_objects.get(id=pk)
		if sale:
			serializer = SaleSerializer(sale)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		else:
			return Response(status=status.HTTP_404_NOT_FOUND)

	def list(self, request):
		queryset = Sale.rel_objects.with_products(sale_owner=request.user.id).order_by('-date')
		serializer = SaleSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)	

class SaleReportViewSet(APIView):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = SaleSerializer


	def get(self, request):
		queryset = Sale.rel_objects.with_products(sale_owner=request.user.id).order_by('-date').filter(date__month = '05')
		print(queryset)
		cant = queryset.count()
		print(cant)
		suma = queryset.aggregate(Sum("total"))
		total= (suma.get("total__sum"))		
		response = {}
		response['cant'] = cant
		response['total'] = total
		print(response)
		return Response(response, status=status.HTTP_200_OK)

class DataViewSet(APIView):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = SaleSerializer


	def get(self, request):
		queryset = Sale.rel_objects.with_products(sale_owner=request.user.id)
		queryset2 = Client.objects.filter(id_user=request.user.id)
		queryset3 = Product.objects.filter(id_user=request.user.id)
		#queryset3 = Product.objects.filter(user = request.user)
		suma = queryset.aggregate(Sum("total"))
		total_ventas = (suma.get("total__sum"))
		total_clientes = queryset2.count()
		total_productos = queryset3.count()		
		response = {}
		response['ventas'] = total_ventas
		response['productos'] = total_productos
		response['clientes'] = total_clientes
		print(response)
		return Response(response, status=status.HTTP_200_OK)	
	


			