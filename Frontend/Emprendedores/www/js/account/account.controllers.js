(function() {
"use-strict";

var app = angular.module('emprendedores');

app.controller('LoginCtrl',LoginCtrl);

LoginCtrl.$inject = ['$scope','$location','$ionicHistory', 'LoginService'];
function LoginCtrl($scope, $location, $ionicHistory , LoginService) {
    $scope.data = {};

    $scope.go = function ( path , disableHistory) {
	  	if (disableHistory) {
	  		$ionicHistory.nextViewOptions({
			    disableBack: true
			});
	  	}
	  	$location.path( path );
	};

	$scope.login = function() {
		var response = LoginService.loginUser(
			$scope.data.username,
			$scope.data.password)
		.success(function(result){
			$scope.go('home',true);
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
RegisterCtrl.$inject = ['$scope', 'LoginService'];

function RegisterCtrl($scope, LoginService){
	$scope.data = {};

	$scope.register = function () {
		if (validateEmail($scope.data.correo) && 
			validatePassword($scope.data.contrasena, $scope.data.confirmarContrasena)) {
			LoginService.registerUser(
			$scope.data.nombre, 
			$scope.data.apellido,
			$scope.data.correo,
			$scope.data.contrasena,
			)
			.success(function(result){
				console.log(result);
			})
		}
	}
}


app.controller('ProductCtrl',function($scope){

});

app.controller('ClientCtrl',function($scope){
	
});


})();

