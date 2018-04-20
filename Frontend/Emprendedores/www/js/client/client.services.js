(function(){
"use-strict";

var app = angular.module('emprendedores');

app.service('ClientService', ClientService);

ClientService.$inject = ['$http','REST_SERVER'];
function ClientService($http, REST_SERVER) {
	var clients = [];

	this.getClients = function(){
		return clients;
	}

	this.retrieveClients = function(){
		$http({
			method: 'GET',
			url: REST_SERVER + '/api/client/list/'
		})
		.success(function(result){
			console.log(result.data)
			clients.push(result.data)
			console.log(clients)
		});
	}
}


})();