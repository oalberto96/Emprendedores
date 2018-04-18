from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response

from accounts.api.serializers import LoginUserSerializer, RegisterUserSerializer
from django.views.decorators.csrf import csrf_exempt


class LoginUserAPI(APIView):
	permission_classes = [permissions.AllowAny]
	serializer_class = LoginUserSerializer
	
	def post(self, request):
		username = request.data.get('username')
		password = request.data.get('password')
		user = authenticate(self,username=username,password=password)
		if user is not None:
			login(request, user)
			response = Response(status=status.HTTP_202_ACCEPTED)
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
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		else:
			return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
		
