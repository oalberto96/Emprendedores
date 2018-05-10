from django.contrib.auth import get_user_model
from rest_framework import serializers

class LoginUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = get_user_model()
		fields = ['username','password']

class RegisterUserSerializer(serializers.ModelSerializer):
	password = serializers.CharField(write_only=True)
	
	class Meta:
		model = get_user_model()
		fields = ['username','email','password','first_name','last_name']

	def create(self, validated_data):
		User = get_user_model()
		user = User.objects.create_user(
				username=validated_data['username'],
				password=validated_data['password'],
				email=validated_data['email'],
				first_name=validated_data['first_name'],
				last_name=validated_data['last_name']
			)
		print(user)
		return user