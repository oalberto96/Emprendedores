from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from business.models import Business

@api_view(['POST'])
def business_register(request, pk=None):
	if request.method == 'POST':
		if Business.objects.filter(user=request.user).exists():
			return Response(status=status.HTTP_409_CONFLICT)
		else:
			name = request.data.get('name')
			description = request.data.get('description')
			url = request.data.get('url')
			business = Business(name=name, description=description, user=request.user, url=url)
			business.save()
			return Response(status=status.HTTP_200_OK)