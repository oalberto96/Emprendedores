var app = angular.module('starter', ['ionic']);

app.controller('LoginCtrl', function($scope, LoginService) {
    $scope.data = {};

    $scope.login = function() {
    	LoginService.loginUser($scope.data.username, $scope.data.password)
    }

});