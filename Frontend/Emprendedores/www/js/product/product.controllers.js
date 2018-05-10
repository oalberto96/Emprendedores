(function(){
	"use-strict";
var app = angular.module('emprendedores');

app.controller('ProductListCtrl', ProductListCtrl);
ProductListCtrl.$inject = ['$scope','$state','ProductService', 'SaleService', '$ionicPopup'];

function ProductListCtrl($scope,$state, ProductService, SaleService, $ionicPopup){

	productList = this;
	ProductService.retrieveProducts();
	productList.products = ProductService.getProducts();

	this.itemOnLongPress = function(indexProduct){
		window.navigator.vibrate(40);
		showQuantityDialog().then(function(quantity){
			SaleService.addProduct(productList.products[indexProduct], quantity);
		});
	}

	productList.go = function(path){
		$state.go(path);
	}

	function showQuantityDialog() {
		return new Promise ((resolve,reject) => {
			$scope.data = [];

			var myPopup = $ionicPopup.show({
		    template: '<input type="number" ng-model="data.quantity">',
		    title: 'Cantidad',
		    subTitle: 'Ingrese cantidad de productos que desea agregar',
		    scope: $scope,
		    buttons: [
		      { text: 'Cancelar' },
		      {
		        text: '<b>Aceptar</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		          if (!$scope.data.quantity) {
		            //don't allow the user to close unless he enters wifi password
		            e.preventDefault();
		          } else {
		            return $scope.data.quantity;
		          }
		        }
		      }
		    ]
		  });
		myPopup.then(function(res) {
			if (res) {
				resolve(res);
			}
		 });
		});
	};
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