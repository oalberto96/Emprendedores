from rest_framework import serializers
from sales.models import Client

class ClientSerializer(serializers.ModelSerializer):
	class Meta:
		model = Client
		fields = ['id','id_user','first_name','last_name', 
		'email', 'phone_number', 'address', 'rfc', 'notes']