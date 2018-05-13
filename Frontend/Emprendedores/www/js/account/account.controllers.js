(function() {
"use-strict";

var app = angular.module('emprendedores');

app.controller('AccountCtrl', AccountCtrl);
AccountCtrl.$inject = ['$scope'];
function AccountCtrl($scope){
	$scope.go = function(path){
		$state.go(path)
	}

}

app.controller('LoginCtrl',LoginCtrl);

LoginCtrl.$inject = ['$scope','$state', 'LoginService'];
function LoginCtrl($scope, $state, LoginService) {
    $scope.data = {};

    $scope.go = function(path){
		$state.go(path)
	}

	$scope.login = function() {
		var response = LoginService.loginUser(
			$scope.data.username,
			$scope.data.password)
		.success(function(result){
			$state.go("home.client");
		}).error(function(result){
			$scope.error = "Correo o contrasena no validos";
		})
    }
}

function validateEmail(email){
    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(String(email).toLowerCase());
}

function validatePassword(password, passwordConfirm){
	return password == passwordConfirm;
}


app.controller('RegisterCtrl', RegisterCtrl);
RegisterCtrl.$inject = ['$scope', '$state', 'LoginService'];

function RegisterCtrl($scope, $state , LoginService){
	$scope.data = {};

	$scope.go = function(path){
		$state.go(path)
	}

	$scope.register = function () {
		var error = false;
		if (!validatePassword($scope.data.contrasena, $scope.data.confirmarContrasena)) {
			$scope.passMessage = "No coindicen las contrasenas"
			error = true;
		}
		if (!error) {
			LoginService.registerUser(
			$scope.data.nombre, 
			$scope.data.apellido,
			$scope.data.correo,
			$scope.data.contrasena,
			)
			.success(function(result){
				$state.go("home.client");
			})
		}
	}
}


app.controller('ProductCtrl',function($scope){

});


app.controller('ClientCtrl',function($scope){
	
	
});

app.controller('ServiceShoppingCtrl', ServiceShoppingCtrl);
ServiceShoppingCtrl.$inject = ['$scope', '$stateParams', '$state', 'AccountService'];

function ServiceShoppingCtrl($scope, $stateParams, $state, AccountService){
	var ctrl = this;
	ctrl.serviceId = $stateParams.serviceId;

	// ctrl.selectService = function(service){
	// 	$scope.go('#/home/sales/{{sale.id}}');
	// }

	ctrl.buyService = function(){
		AccountService.buyService(ctrl.serviceId)
		.then(function(result){
			if (result.status = 202) {
				$state.go('register-business');
			}
		})
	}
}




})();

