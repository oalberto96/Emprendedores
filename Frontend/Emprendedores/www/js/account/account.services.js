(function() {
var app = angular.module('emprendedores');

app.service('LoginService', LoginService);

LoginService.$inject = ['$http'];
function LoginService($http) {
    this.loginUser = function (username, password) {
    	return $http({
		  method: 'POST',
		  data: {
		  	"username": username,
		  	"password": password
		  },
		  url: 'http://10.0.0.4:8000/api/account/login/'
		});
    }

	this.registerUser = function (nombre, apellidos, correo, contrasena){
		alert("Usuario registrado");
	}
}

})();
