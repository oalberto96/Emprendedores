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
})();