(function(){
	"use-strict";
var app = angular.module('emprendedores');

app.controller('ProductListCtrl', ProductListCtrl);
ProductListCtrl.$inject = ['$scope','$state','ProductService'];

function ProductListCtrl($scope,$state, ProductService){

	productList = this;

	productList.go = function(path){
		$state.go(path);
	}

	ProductService.retrieveProducts();
	this.products = ProductService.getProducts();
}

app.controller('ProductAddCtrl', ProductAddCtrl);
ProductAddCtrl.$inject = ['$scope', '$ionicHistory','$state','ProductService'];

function ProductAddCtrl($scope,$ionicHistory, $state ,ProductService){

	this.submit_product = function () {
		ProductService.addProduct(
			this.name_product,
			this.price,
			this.sku,
			this.comment
			)
		.success(function(result){
			$state.go($ionicHistory.backView().stateName);
		});
	}
}

app.controller('ProductGetCtrl', ProductGetCtrl);
ProductGetCtrl.$inject = ['$scope', '$stateParams','$ionicHistory', '$state',  'ProductService'];

function ProductGetCtrl($scope, $stateParams, $ionicHistory, $state,  ProductService){
	ctrl = this;

	this.retrieveProduct = function () {

		ProductService.retrieveProduct($stateParams.productId)
		.success(function(result){
			ctrl.name_product = result.name_product;
			ctrl.price = result.price;
			ctrl.sku = result.sku;
			ctrl.comment = result.comment;
		});
	}

	this.updateProduct = function(){
		ProductService.updateProduct(
			$stateParams.productId,
			this.name_product,
			this.price,
			this.sku,
			this.comment
			)
		.success(function(result){
			$state.go($ionicHistory.backView().stateName);
		});
	}

	this.deleteProduct = function(){
		ProductService.deleteProduct($stateParams.productId)
		.success(function(result){
			$state.go('home.product');
		});
	}

	this.retrieveProduct();
}




})();