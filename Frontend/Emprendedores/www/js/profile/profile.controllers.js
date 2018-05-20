(function () {
"use-strict";

var app = angular.module('emprendedores');


app.controller('ProfileGetCtrl', ProfileGetCtrl);
ProfileGetCtrl.$inject = ['$scope', '$stateParams','$ionicHistory', '$state',  'ProfileService', 'AccountService'];

function ProfileGetCtrl($scope, $stateParams, $ionicHistory, $state,  ProfileService, AccountService){
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

	this.checkService = function(){
		AccountService.checkUserServices()
		.then(function(result){
			if (result.status == 204) {
				$state.go('services');
			}
		});
	}

	this.about = function(){
		$state.go('home.about');
	}

	this.help = function(){
		$state.go('home.help');
	}	

	this.retrieveProfile();

}
})();