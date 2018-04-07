var app = angular.module('starter.controllers', ['ngCookies']);

app.controller('LoginCtrl', function($scope, $location, LoginService, $cookies) {
    $scope.data = {};

    $scope.go = function ( path ) {
		console.log(path)
	  $location.path( path );
	};

	$scope.login = function() {
    	LoginService.loginUser($scope.data.username, $scope.data.password);
    };

});

function validateEmail(email){
    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(String(email).toLowerCase());
}

function validatePassword(password, passwordConfirm){
	return password == passwordConfirm;
}

app.controller('RegisterCtrl', function($scope, LoginService){
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
		}
	}
});