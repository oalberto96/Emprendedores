(function () {
"use-strict";

var app = angular.module('emprendedores');

app.controller('HomeListCtrl', HomeListCtrl);
HomeListCtrl.$inject = ['$scope','$state', '$ionicHistory'];

function HomeListCtrl($scope,$state,$ionicHistory){
	
	graphList = this;

	graphList.go = function(path){
		/*$ionicHistory.nextViewOptions({
			historyRoot: true
		});*/		
		$state.go(path);
	}
	//this.clients = ClientService.getClients();
}


app.controller('GraphLineController',GraphLineController);
GraphLineController.$inject = ['$scope',  'DataService'];

function GraphLineController($scope, DataService){
	$scope.labels = ["January", "March", "April"];
    $scope.series = ['Series A', 'Series B'];
    this.retrieveData = function () {
		DataService.retrieveData()
		.success(function(result){
			$scope.data = [[result.ventas, result.productos, result.clientes], [result.productos, result.ventas]];
		});
	}
	this.retrieveData();
    /*$scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];*/
}

app.controller('GraphChartController',GraphChartController);
GraphChartController.$inject = ['$scope', 'DataService'];

function GraphChartController($scope, DataService){
	$scope.labels = ['Ventas', 'Productos', 'Clientes'];
    $scope.series = ['Series A'];

   	this.retrieveData = function () {
		DataService.retrieveData()
		.success(function(result){
			$scope.data = [[result.ventas, result.productos, result.clientes]];
		});
	}
	this.retrieveData();
}

})();