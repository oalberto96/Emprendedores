(function(){
	"use-strict";

	var app = angular.module('emprendedores');

	app.service('ReportService', ReportService);

	ReportService.$inject = ['$http','$cookies','REST_SERVER'];
	function ReportService($http,$cookies, REST_SERVER) {
		
		this.retrieveReport = function(){
			return $http({
				method: 'GET',
				url: REST_SERVER + '/api/sale/report/'
			});
		}
	}


})();