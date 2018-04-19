from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User

from sales.api.serializers import ClientSerializer
from sales.models import Client

class ClientViewSet(viewsets.ViewSet):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = ClientSerializer

	def list(self, request):
		'''
		Listar todos los clientes que el usuario creo
		'''
		queryset = Client.objects.filter(id_user=request.user.id)
		serializer = ClientSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)