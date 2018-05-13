(function(){
	"use-strict";

	var app = angular.module('emprendedores');

	app.service('ProfileService', ProfileService);

	ProfileService.$inject = ['$http','REST_SERVER'];
	function ProfileService($http, REST_SERVER) {
		
		this.retrieveProfile = function(){
			return $http({
				method: 'GET',
				url: REST_SERVER + '/api/account/user'
			});
		}
	}


})();