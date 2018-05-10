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
})();