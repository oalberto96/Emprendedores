var app = angular.module('starter.services', ['ngCookies']);

app.service('LoginService', function($http, $cookies) {
    this.loginUser = function (username, password) {
    	return $http({
		  method: 'POST',
		  data: {
		  	"username": username,
		  	"password": password
		  },
		  url: 'http://localhost:8000/api/account/login/'
		});
    }

	this.registerUser = function (nombre, apellidos, correo, contrasena){
		alert("Usuario registrado")
	}
});