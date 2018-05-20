(function () {
"use-strict";

var app = angular.module('emprendedores');

app.controller('HomeListCtrl', HomeListCtrl);
HomeListCtrl.$inject = ['$scope','$state', '$ionicHistory','GraphService'];

function HomeListCtrl($scope,$state,$ionicHistory, GraphService){
	
	graphList = this;

	graphList.go = function(path){
		/*$ionicHistory.nextViewOptions({
			historyRoot: true
		});*/		
		$state.go(path);
	}




	//this.clients = ClientService.getClients();
}
})();