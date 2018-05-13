(function(){
	"use-strict";
var app = angular.module('emprendedores');

app.service('BusinessService', BusinessService);
BusinessService.$inject = ['$http', 'REST_SERVER'];
function BusinessService($http, REST_SERVER){
	var service = this;
	service.register = function(data){
		return $http({
			method: 'POST',
			data: data,
			url: REST_SERVER + '/api/business/'
		});
	}
}
})();