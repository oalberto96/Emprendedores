var app = angular.module('starter');

app.service('LoginService', function($http) {
    this.loginUser = function (username, password) {
    	$http({
		  method: 'POST',
		  data: {"username": username, "password": password},
		  url: '/api/login'
//  TODO: realizar las acciones en el controlador
		}).then(function successCallback(response) {
		    alert("success")
		  }, function errorCallback(response) {
		    alert("fail")
		  });
    }
});

