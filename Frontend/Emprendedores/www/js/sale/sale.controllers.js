(function(){
	"use-strict";
	var app = angular.module('emprendedores');
	//Cambiar esto a perfil
	app.controller('SalesCtrl', SalesCtrl);

	SalesCtrl.$inject = ['$scope','$state', 'AccountService'];

	function SalesCtrl($scope, $state, AccountService){
		$scope.go = function(path){
			$state.go(path);
		}

		$scope.checkService = function(){
			AccountService.checkUserServices()
			.then(function(result){
				if (result.status == 204) {
					$state.go('services');
				}
			});
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

		ctrl.dirigir = function(){
			$ionicHistory.nextViewOptions({
      			historyRoot: true

    		});			
			$state.go('home.sale');
		}	

		ctrl.submit = function(){
			SaleService.createSale(ctrl.clientSelected, ctrl.total())
			.then(function(result){
				ctrl.sale = SaleService.getSale();
				ctrl.total();
				$ionicHistory.nextViewOptions({
      				historyRoot: true

    			});
				//stateName = "home.thanksSale";
				$state.go('home.thanksSale');
				//$state.go($ionicHistory.backView().stateName);

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