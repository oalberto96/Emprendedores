var app = angular.module('starter.services', ['ngCookies']);

app.service('LoginService', function($http, $cookies) {
    this.loginUser = function (username, password) {
    	$http({
    	  headers: {
    	  	'X-CSRFToken': $cookies.get('csrftoken')
    	  },
		  method: 'POST',
		  data: {
		  	"username": username,
		  	"password": password
		  },
		  url: '/api/account/login'
//  TODO: realizar las acciones en el controlador
		}).then(function successCallback(response) {
		    alert("success")
		  }, function errorCallback(response) {
		    alert("fail")
		  });
    }

	this.registerUser = function (nombre, apellidos, correo, contrasena){
		alert("Usuario registrado")
	}
});