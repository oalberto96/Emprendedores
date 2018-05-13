(function(){
	"use-strict";

	var app = angular.module('emprendedores');

	app.service('ProductService', ProductService);

	ProductService.$inject = ['$http','REST_SERVER'];
	function ProductService($http, REST_SERVER) {
		var products = [];

		this.getProducts = function(){
			return products;
		}

		this.retrieveProducts = function(){
			$http({
				method: 'GET',
				url: REST_SERVER + '/api/sale/products'
			})
			.success(function(result){
				for (var i = 0; i < result.length; i++) {
					products.push(result[i])
				}
			});
		}

		this.retrieveProduct = function(productId){
			return $http({
				method: 'GET',
				url: REST_SERVER + '/api/sale/products/' + productId.toString()
			});
		}

		this.retrieveBusinessProducts = function(business){
			return $http({
				method: 'GET',
				url: REST_SERVER + '/api/business/' + business.toString() + '/products'
			})
			.success(function(result){
				for (var i = 0; i < result.length; i++) {
					products.push(result[i])
				}
			});
		}

		this.updateProduct = function (productId, name_product,price,sku,comment){
			return $http({
				method: 'PUT',
				data: {
					"name_product": name_product,
					"price": price,
					"sku": sku,
					"comment": comment
				},
				url: REST_SERVER + '/api/sale/products/' + productId.toString() 
			})
			.success(function(response){
				if (products) {
					var result = products.filter(function(obj){
						return obj.id == productId;
					});
					var i = products.indexOf(result[0]);
					products[i] = {
						"id": response.id,
						"id_user": response.id,
						"name_product": response.name_product,
						"price": response.price,
						"sku": response.sku,
						"comment": response.comment
					}
				}
			});
		}

		this.deleteProduct = function(productId){
			return $http({
				method: 'DELETE',
				url: REST_SERVER + '/api/sale/products/' + productId.toString()
			})
			.success(function(result){
				if (products) {
					var result = products.filter(function(obj){
						return obj.id == productId;
					});
					var i = products.indexOf(result[0]);
					products.splice(i, 1);
				}
			});
		}



		this.addProduct = function (name_product,price,sku,comment){
			return $http({
				method: 'POST',
				data: {
					"name_product": name_product,
					"price": price,
					"sku": sku,
					"comment": comment
				},
				url: REST_SERVER + '/api/sale/products'
			})
			.success(function(result){
				products.push(result);
			});
		}
	}


})();