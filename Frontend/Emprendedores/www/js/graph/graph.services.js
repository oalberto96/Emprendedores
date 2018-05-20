(function(){
	"use-strict";

	var app = angular.module('emprendedores');

	app.service('DataService', DataService);

	DataService.$inject = ['$http','$cookies','REST_SERVER'];
	function DataService($http,$cookies, REST_SERVER) {
		
		this.retrieveData = function(){
			return $http({
				method: 'GET',
				url: REST_SERVER + '/api/sale/data/'
			});
		}
	}


})();