(function(){
	"use-strict";
	var app = angular.module('emprendedores');

	app.controller('BusinessCtrl', BusinessCtrl);
	BusinessCtrl.$inject = ['$scope'];
	function BusinessCtrl($scope){
		$scope.go = function(path){
			$state.go(path)
		}
	}

	app.controller('BusinessRegisterCtrl', BusinessRegisterCtrl);
	BusinessRegisterCtrl.$inject = ['$scope', '$state', 'BusinessService'];
	function BusinessRegisterCtrl($scope, $state, BusinessService){
		var ctrl = this;
		ctrl.register = function(){
			BusinessService.register(ctrl.data)
			.then(function(result){
				//status Ok
				if(result.status == 200){
					$state.go('home.client');
				}
			})
			.catch(function(error){
				$state.go('login');
			})
		}
	}

	app.controller('BusinessHomeCtrl', BusinessHomeCtrl);
	BusinessHomeCtrl.$inject = ['$state', '$stateParams', 'BusinessService', 'ProductService'];
	function BusinessHomeCtrl($state, $stateParams, BusinessService, ProductService){
		var ctrl = this;
		ctrl.business = [];
		BusinessService.getInfo($stateParams.business)
		.then(function(result){
			ctrl.business.name = result.data.name;
			ctrl.business.description = result.data.description;
			console.log(result);
		});

		ProductService.retrieveBusinessProducts($stateParams.business)
		.then(function(result){
			ctrl.products = ProductService.getProducts();
		})


	}
})();