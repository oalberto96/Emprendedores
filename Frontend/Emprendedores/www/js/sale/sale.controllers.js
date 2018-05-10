(function(){
	"use-strict";
var app = angular.module('emprendedores');

app.controller('SalesCtrl', SalesCtrl);

SalesCtrl.$inject = ['$scope','$state'];

function SalesCtrl($scope, $state){

	$scope.go = function(path){
		$state.go(path);
	}
}

app.controller('SaleCtrl', SaleCtrl);
SaleCtrl.$inject = ['$scope', '$state', '$ionicPopup', '$ionicHistory', 'SaleService'];
function SaleCtrl($scope, $state, $ionicPopup, $ionicHistory,  SaleService){
	var ctrl = this;
	ctrl.sale = SaleService.getSale();

	ctrl.submit = function(){
		SaleService.createSale()
		.then(function(result){
			ctrl.sale = SaleService.getSale();
			ctrl.total();
			$state.go($ionicHistory.backView().stateName);
		});
	}

	ctrl.total = function(){
		var total = 0;
		ctrl.sale.products.forEach(function(item){
			total += item.price * item.quantity;
		})
		return total;
	}
}


})();