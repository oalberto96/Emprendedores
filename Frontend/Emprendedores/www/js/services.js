var app = angular.module('starter.services', ['ngCookies']);

app.service('LoginService', function($http, $cookies) {
    this.loginUser = function (username, password) {
    	return $http({
    	  headers: {
    	  	'X-CSRFToken': $cookies.get('csrftoken')
    	  },
		  method: 'POST',
		  data: {
		  	"username": username,
		  	"password": password
		  },
		  url: '/api/account/login'
		});
    }

	this.registerUser = function (nombre, apellidos, correo, contrasena){
		alert("Usuario registrado")
	}
});