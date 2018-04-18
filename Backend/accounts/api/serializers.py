from django.contrib.auth.models import User
from rest_framework import serializers

class LoginUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['username','password']

class RegisterUserSerializer(serializers.ModelSerializer):
	password = serializers.CharField(write_only=True)
	
	class Meta:
		model = User
		fields = ['username','email','password','first_name','last_name']

	def create(self, validated_data):
		user = User.objects.create_user(
			username=validated_data['username'],
			password=validated_data['password'],
			email=validated_data['email'],
			first_name=validated_data['first_name'],
			last_name=validated_data['last_name']
			)
		return user