(function(){
	"use-strict";

	var app = angular.module('emprendedores');

	app.service('ProfileService', ProfileService);

	ProfileService.$inject = ['$http','$cookies','REST_SERVER'];
	function ProfileService($http,$cookies, REST_SERVER) {
		
		this.retrieveProfile = function(){
			return $http({
				method: 'GET',
				url: REST_SERVER + '/api/account/user'
			});
		}

		this.logoutProfile = function(){
			return $http({
				method: 'GET',
				url: REST_SERVER + '/api/account/logout/'
			}).success(function(data,status,headers,config){
				$cookies.get('csrftoken')
				$cookies.remove('csrftoken')
				$cookies.get('sessionid')
				$cookies.remove('sessionid')
			});
		}
	}


})();