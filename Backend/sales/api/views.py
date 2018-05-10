from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User

from sales.api.serializers import ClientSerializer, ProductSerializer, SaleSerializer
from sales.models import Client, Product

class ClientViewSet(viewsets.ViewSet):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = ClientSerializer

	def create(self, request):
		request.data['id_user'] = str(request.user.id) #TODO: Mejorar implementacion
		serializer = ClientSerializer(data=request.data)
		serializer.is_valid()
		serializer.save()
		return Response(serializer.data, status=status.HTTP_201_CREATED)

	def retrieve(self, request, pk=None):
		group_required = ['ulevel0']
		queryset = Client.objects.get(id=pk)
		serializer = ClientSerializer(queryset)
		return Response(serializer.data, status=status.HTTP_201_CREATED)

	def update(self, request, pk=None):
		queryset = Client.objects.get(id=pk)
		request.data['id_user'] = str(request.user.id)
		serializer = ClientSerializer(queryset, request.data, many=False)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
		print(serializer.data)
		return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

	def destroy(self, request, pk=None):
		Client.objects.filter(id=pk).delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

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


class SaleViewSet(viewsets.ViewSet):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = SaleSerializer

	def create(self, request):
		request.data['id_user'] = str(request.user.id) #TODO: Mejorar implementacion
		serializer = SaleSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		else:
			return Response(status=status.HTTP_406_NOT_ACCEPTABLE)