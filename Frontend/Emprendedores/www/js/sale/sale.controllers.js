(function(){
	"use-strict";
	var app = angular.module('emprendedores');
	//Cambiar esto a perfil
	app.controller('SalesCtrl', SalesCtrl);

	SalesCtrl.$inject = ['$scope','$state','$ionicHistory','AccountService'];

	function SalesCtrl($scope, $state, $ionicHistory, AccountService){
		$scope.go = function(path){
			$state.go(path);
		}

		$scope.dirigir = function(){
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});			
			$state.go('home.sale');
		}
	}


	app.controller('SaleListCtrl', SaleListCtrl);
	SaleListCtrl.$inject = ['SaleService'];
	function SaleListCtrl(SaleService){
		var ctrl = this;
		SaleService.retrieveSales();
		ctrl.sales = SaleService.getSales();

	}

	app.controller('SaleAddCtrl', SaleAddCtrl);
	SaleAddCtrl.$inject = ['$scope', '$state', '$ionicPopup', '$ionicHistory', 'SaleService', 'ClientService'];
	function SaleAddCtrl($scope, $state, $ionicPopup, $ionicHistory,  SaleService, ClientService){
		var ctrl = this;
		ctrl.sale = SaleService.getSale();
		ctrl.clients = ClientService.getClients();
		var error = "";
		ctrl.submit = function(){
			if (ctrl.sale.products.length > 0) {
				if (ctrl.clientSelected == undefined) {
					error = "Selecciona un cliente";
				} else {
					SaleService.createSale(ctrl.clientSelected, ctrl.total())
					.then(function(result){
						ctrl.sale = SaleService.getSale();
						ctrl.total();
						$ionicHistory.nextViewOptions({
							historyRoot: true

						});
						$state.go('home.thanksSale');
					});
				}
			} else {
				error = "Agregue productos ";
			}
		}

		ctrl.total = function(){
			var total = 0;
			if (ctrl.sale.products.length > 0 && ctrl.clientSelected != undefined) {
				error = "";
			}
			ctrl.error = error;
			ctrl.sale.products.forEach(function(item){
				total += item.price * item.quantity;
			})
			return total;
		}
	}

	app.controller('SaleGetCtrl', SaleGetCtrl);
	SaleGetCtrl.$inject = ['$stateParams', 'SaleService'];
	function SaleGetCtrl($stateParams, SaleService){
		var ctrl = this;
		SaleService.retrieveSale($stateParams.saleId)
		.then(function(result){
			ctrl.sale = result.data;
		});
	}


})();