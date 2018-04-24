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
	}
})();