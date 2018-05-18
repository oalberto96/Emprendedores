(function () {
"use-strict";

var app = angular.module('emprendedores');


app.controller('ProfileGetCtrl', ProfileGetCtrl);
ProfileGetCtrl.$inject = ['$scope', '$stateParams','$ionicHistory', '$state',  'ProfileService'];

function ProfileGetCtrl($scope, $stateParams, $ionicHistory, $state,  ProfileService){
	ctrl = this;

	this.retrieveProfile = function () {

		ProfileService.retrieveProfile()
		.success(function(result){
			ctrl.first_name = result.first_name;
			ctrl.last_name = result.last_name;
			ctrl.email = result.email;
			ctrl.cambio = result.cambio;
		});
	}

	this.logout = function(){
		
		ProfileService.logoutProfile()
		.success(function(result){
			$state.go('login');
			location.reload();
		});
	} 
	this.retrieveProfile();
}
})();