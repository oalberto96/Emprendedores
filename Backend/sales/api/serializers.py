from rest_framework import serializers
from sales.models import Client, Product, Sale, SaleProduct
from accounts.models import User

class ClientSerializer(serializers.ModelSerializer):
	class Meta:
		model = Client
		fields = ['id','id_user','first_name','last_name', 
		'email', 'phone_number', 'address', 'rfc', 'notes']

class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model = Product
		fields = ['id','id_user', 'name_product', 'price',
		'sku', 'comment']

class SaleSerializer(serializers.ModelSerializer):
	products = serializers.ListField(
			child = serializers.DictField()
		)

	class Meta:
		model = Sale
		fields = ['id_user', 'id_client',  'date', 'products',
		'discount', 'subtotal', 'pay_type', 'total', 'finished']

	def create(self, validated_data):
		sale = Sale()
		sale.id_user = User.objects.get(id=1)
		sale.id_client = validated_data.get('id_client')
		sale.date = validated_data.get('date')
		sale.discount = validated_data.get('discount')
		sale.subtotal = validated_data.get('subtotal')
		sale.pay_type = validated_data.get('pay_type')
		sale.total = validated_data.get('total')
		sale.finished = validated_data.get('finished')
		sale.products = validated_data.get('products')
		sale.save()
		# Save every product in table SaleProduct
		for product in sale.products:
			sale_product = SaleProduct()
			sale_product.id_sale = sale
			sale_product.id_product = Product.objects.get(id=product['id_product'])
			sale_product.quantity = product['quantity']
			sale_product.save()

		return sale