(function(){
	"use-strict";
	var app = angular.module('emprendedores');

	app.service('SaleService', SaleService);

	SaleService.$inject = ['$http','REST_SERVER'];

	function SaleService($http, REST_SERVER) {
		var service = this;
		var sales = [];
		var sale = {
			"id_user": null,
			"id_client": 1,
			"products": [],
			"date": new Date(),
			"discount": 0,
			"subtotal": 0,
			"pay_type": 0,
			"total": 	0,
			"finished": true
		};

		function saleInit(){
			sale.id_user = null;
			sale.id_client = 1;
			sale.products = [];
			sale.date = new Date();
			sale.discount = 0;
			sale.subtotal = 0;
			sale.pay_type = 0;
			sale.total = 0;
			sale.finished = true;
		}

		service.addProduct = function(product, quantity = 1){
			//If already exist the same product in the sale list,
			// add the quantity product in product list
			var productExist = sale.products.filter(function(obj){
				if (obj.id == product.id) {
					obj.quantity += quantity;
					return obj.id == product.id;
				}
			});
			if (productExist.length < 1) {
				product.quantity = quantity;
				sale.products.push(product);
			}
		}

		service.getSales = function(){
			return sales;
		}

		service.getSale = function(){
			return sale;
		}

		service.getProducts = function(){
			return sale.products;
		}

		service.proceedSale = function(total, businessUrl){
			var products = []
			//Send only product's id
			sale.products.forEach(function(product){
				item = {
					"id_product": product.id.toString(),
					"quantity": product.quantity
				}
				products.push(item)
			});
			var data = {
					"products": products,
					"date": new Date(),
					"discount": sale.discount,
					"subtotal": sale.subtotal,
					"pay_type": sale.pay_type,
					"total": 	total,
					"finished": sale.finished
				}
			return $http({
				method: 'POST',
				data: data,
				url: REST_SERVER + '/api/business/' + businessUrl.toString() + '/sale'
			}).then(function(result){
				sales.push(result.data);
				saleInit();
			});
		}

		service.createSale = function(client, total){
			var products = []
			//Send only product's id
			sale.products.forEach(function(product){
				item = {
					"id_product": product.id.toString(),
					"quantity": product.quantity
				}
				products.push(item)
			});
			return $http({
				method: 'POST',
				data: {
					"id_user": sale.id_user,
					"id_client": client.id,
					"products": products,
					"date": new Date(),
					"discount": sale.discount,
					"subtotal": sale.subtotal,
					"pay_type": sale.pay_type,
					"total": 	total,
					"finished": sale.finished
				},
				url: REST_SERVER + '/api/sale/sales'
			}).then(function(result){
				sales.push(result.data);
				saleInit();
			});
		}

		service.retrieveSales = function(){
			return $http({
				method: 'GET',
				url: REST_SERVER + '/api/sale/sales'
			}).then(function(result){
				for (var i = 0; i < result.data.length; i++) {
					sales.push(result.data[i]);
				}
			});
		}


		service.retrieveSale = function(saleId){
			return $http({
				method: 'GET',
				url: REST_SERVER + '/api/sale/sales/' + saleId.toString()
			})
		}
	}
})();