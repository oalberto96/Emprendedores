(function() {
"use-strict";

var app = angular.module('emprendedores');

app.service('LoginService', LoginService);

LoginService.$inject = ['$http','$cookies','REST_SERVER'];
function LoginService($http, $cookies, REST_SERVER) {
    this.loginUser = function (username, password) {
    	return $http({
		  method: 'POST',
		  data: {
		  	"username": username,
		  	"password": password
		  },
		  url: REST_SERVER + '/api/account/login/'
		}).success(function(data, status, headers, config){
			console.log(data)
			token = String('Token ') + data['token'];
			$cookies.put('csrftoken', data['csrftoken'])
			$cookies.put('sessionid', token );
		});
    }

	this.registerUser = function (nombre, apellidos, correo, contrasena){
		return $http({
		  method: 'POST',
		  data: {
		  	"username": correo,
		  	"first_name": nombre,
		  	"last_name": apellidos,
		  	"email": correo,
		  	"password": contrasena
		  },
		  url: REST_SERVER + '/api/account/register/'
		});
	}
}
})();
