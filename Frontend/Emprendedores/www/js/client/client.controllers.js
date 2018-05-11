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

app.controller('ClientGetCtrl', ClientGetCtrl);
ClientGetCtrl.$inject = ['$scope', '$stateParams','$ionicHistory', '$state',  'ClientService'];

function ClientGetCtrl($scope, $stateParams, $ionicHistory, $state,  ClientService){
	ctrl = this;

	this.retrieveClient = function () {

		ClientService.retrieveClient($stateParams.clientId)
		.success(function(result){
			ctrl.first_name = result.first_name;
			ctrl.last_name = result.last_name;
			ctrl.email = result.email;
			ctrl.phone_number = result.phone_number;
			ctrl.address = result.address;
			ctrl.rfc = result.rfc;
			ctrl.notes = result.notes;
		});
	}

	this.updateClient = function(){
		ClientService.updateClient(
			$stateParams.clientId,
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

	this.deleteClient = function(){
		ClientService.deleteClient($stateParams.clientId)
		.success(function(result){
			$state.go('home.client');
		});
	}

	this.retrieveClient();
}
})();