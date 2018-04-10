from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response

from accounts.api.serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt


class UserAPILogin(APIView):
	permission_classes = [permissions.AllowAny]
	serializer_class = UserSerializer
	
	def post(self, serializer):
		username = serializer.data.get('username')
		password = serializer.data.get('password')
		user = authenticate(self,username=username,password=password)
		if user is not None:
			login(serializer, user)
			response = Response(status=202) # Accepted
		else:
			response = Response(status=406) # Not Acceptable
		return response