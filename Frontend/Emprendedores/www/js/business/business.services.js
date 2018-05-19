(function(){
	"use-strict";
var app = angular.module('emprendedores');

app.service('BusinessService', BusinessService);
BusinessService.$inject = ['$http', 'REST_SERVER', '$cookies'];
function BusinessService($http, REST_SERVER, $cookies){
	var service = this;
	service.register = function(data){
		return $http({
			method: 'POST',
			data: data,
			url: REST_SERVER + '/api/business/'
		});
	}

	service.getInfo = function(businessName){
		return $http({
			method: 'GET',
			url: REST_SERVER + '/api/business/' + businessName.toString()
		})
	}

	service.userRegister = function (user, business){
		console.log(business);
		return $http({
		  method: 'POST',
		  data: user,
		  url: REST_SERVER +'/api/business/'+ business.toString() +'/client'
		}).success(function(data, status, headers, config){
			// token = String('Token ') + data['token'];
			// $cookies.put('csrftoken', data['csrftoken'])
			// $cookies.put('sessionid', token );
		});
	}
}
})();
