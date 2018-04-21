(function () {
"use-strict";

var app = angular.module('emprendedores');

app.controller('ClientListController', ClientListController);
ClientListController.$inject = ['$scope','$state','ClientService'];

function ClientListController($scope,$state, ClientService){

	clientList = this;

	clientList.go = function(path){
		$state.go(path);
	}

	ClientService.retrieveClients();
	this.clients = ClientService.getClients();
}

app.controller('ClientAddCtrl', ClientAddCtrl);
ClientAddCtrl.$inject = ['$scope', '$ionicHistory','$state','ClientService'];

function ClientAddCtrl($scope,$ionicHistory, $state ,ClientService){

	this.submit = function () {
		ClientService.addClient(
			this.first_name,
			this.last_name,
			this.email,
			this.phone_number,
			this.address,
			this.rfc,
			this.notes
			)
		.success(function(result){
			$state.go($ionicHistory.backView().stateName);
		});
	}
}
})();