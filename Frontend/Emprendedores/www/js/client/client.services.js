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
				url: REST_SERVER + '/api/sale/clients'
			})
			.success(function(result){
				for (var i = 0; i < result.length; i++) {
					clients.push(result[i])
				}
			});
		}

		this.retrieveClient = function(clientId){
			return $http({
				method: 'GET',
				url: REST_SERVER + '/api/sale/clients/' + clientId.toString()
			});
		}

		this.deleteClient = function(clientId){
			return $http({
				method: 'DELETE',
				url: REST_SERVER + '/api/sale/clients/' + clientId.toString()
			})
			.success(function(result){
				if (clients) {
					var result = clients.filter(function(obj){
						return obj.id == clientId;
					});
					var i = clients.indexOf(result[0]);
					clients.splice(i, 1);
				}
			});
		}

		this.addClient = function (first_name,last_name,email,phone_number,address,rfc,notes){
			return $http({
				method: 'POST',
				data: {
					"first_name": first_name,
					"last_name": last_name,
					"email": email,
					"phone_number": phone_number,
					"address": address,
					"rfc": rfc,
					"notes": notes
				},
				url: REST_SERVER + '/api/sale/clients'
			})
			.success(function(result){
				clients.push(result);
			});
		}
	}


})();