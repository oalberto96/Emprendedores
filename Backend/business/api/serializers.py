from rest_framework import serializers
from accounts.models import User

class ClientSerializer(serializers.ModelSerializer):
	class Meta:
		model = Client
		fields = ['name','description']