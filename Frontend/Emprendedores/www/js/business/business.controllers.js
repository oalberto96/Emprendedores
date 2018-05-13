(function(){
	"use-strict";
	var app = angular.module('emprendedores');

	app.controller('BusinessCtrl', BusinessCtrl);
	BusinessCtrl.$inject = ['$scope'];
	function BusinessCtrl($scope){
		$scope.go = function(path){
			$state.go(path)
		}

	}
})();