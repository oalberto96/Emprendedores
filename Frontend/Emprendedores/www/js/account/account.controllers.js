(function() {
"use-strict";

var app = angular.module('emprendedores');

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


})();

