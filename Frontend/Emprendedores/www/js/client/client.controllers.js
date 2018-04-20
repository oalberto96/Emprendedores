(function () {
"use-strict";

var app = angular.module('emprendedores');

app.controller('ClientListController', ClientListController);
ClientListController.$inject = ['$scope','ClientService'];

function ClientListController($scope, ClientService){
	clientList = this;
	ClientService.retrieveClients();
	this.clients = ClientService.getClients();
}

})();