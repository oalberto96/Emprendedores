from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import Group
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token

from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from accounts.api.serializers import LoginUserSerializer, RegisterUserSerializer, ServiceUserSerializer, UserSerializer


class LoginUserAPI(APIView):
	permission_classes = [permissions.AllowAny]
	serializer_class = LoginUserSerializer
	
	def post(self, request):
		username = request.data.get('username')
		password = request.data.get('password')
		user = authenticate(self,username=username,password=password)
		if user is not None:
			csrf_token = get_token(request)
			login(request, user)
			token, created  = Token.objects.get_or_create(user=user)
			response = Response({'token': token.key,'csrftoken': csrf_token})
		else:
			response = Response(status=status.HTTP_406_NOT_ACCEPTABLE)
		return response

class RegisterUserAPI(APIView):
	permission_classes = [permissions.AllowAny]
	serializer_class = RegisterUserSerializer

	def post(self, request):
		serializer = RegisterUserSerializer(data=request.data)
		if(serializer.is_valid()):
			serializer.save()
			logUser = LoginUserAPI()
			return logUser.post(request)
		else:
			return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
		
class ServiceUserAPI(APIView):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class  = ServiceUserSerializer

	def get(self, request):
		groups = [group for group in request.user.groups.all()]
		print(groups)
		if len(groups) > 0:
			return Response(groups[0].name, status=status.HTTP_200_OK)
		else:
			return Response(status=status.HTTP_204_NO_CONTENT)

class User(APIView):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class  = UserSerializer

	def get(self,request):
		response = {}
		response ['username'] = request.user.username
		response ['first_name'] = request.user.first_name
		response ['last_name'] = request.user.last_name
		response ['email'] = request.user.email
		return Response(response, status=status.HTTP_200_OK)


@api_view()
def buy_service(request, pk=None):
	#groups = 
	groups = {
	'1': 'servicio administracion',
	'2': 'servicio apartado',
	'3': 'servicio domicilio'
	}
	group = Group.objects.get(name=groups.get(str(pk)))
	if group:
		group.user_set.add(request.user)
		return Response(status=status.HTTP_202_ACCEPTED)
	else:
		#Si el servicio no esta registrado
		return Response(status=status.HTTP_501_NOT_IMPLEMENTED)