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
			url: REST_SERVER + '/api/clients/'
		})
		.success(function(result){
			for (var i = 0; i < result.length; i++) {
				clients.push(result[i])
			}
		});
	}
}


})();